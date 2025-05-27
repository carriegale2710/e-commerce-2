import { render, waitFor } from "@testing-library/react";
import ProductsLoader from "./ProductsLoader";
import * as productServices from "../../services/product-services";

describe("ProductsLoader", () => {
  it("calls setLoading, setProducts, and setError appropriately", async () => {
    const setProducts = vi.fn();
    const setLoading = vi.fn();
    const setError = vi.fn();

    // Mock getAllProducts to resolve with sample data
    vi.spyOn(productServices, "getAllProducts").mockResolvedValue([
      { id: "1", name: "Test Product" },
    ]);

    render(
      <ProductsLoader
        setProducts={setProducts}
        setLoading={setLoading}
        setError={setError}
      />
    );

    // setLoading(true) called at start, setLoading(false) at end
    await waitFor(() => {
      expect(setLoading).toHaveBeenCalledWith(true);
      expect(setProducts).toHaveBeenCalledWith([
        { id: "1", name: "Test Product" },
      ]);
      expect(setLoading).toHaveBeenCalledWith(false);
    });
  });

  it("calls setError if getAllProducts throws", async () => {
    const setProducts = vi.fn();
    const setLoading = vi.fn();
    const setError = vi.fn();

    vi.spyOn(productServices, "getAllProducts").mockRejectedValue(
      new Error("Fetch error")
    );

    render(
      <ProductsLoader
        setProducts={setProducts}
        setLoading={setLoading}
        setError={setError}
      />
    );

    await waitFor(() => {
      expect(setError).toHaveBeenCalledWith("Fetch error");
      expect(setLoading).toHaveBeenCalledWith(false);
    });
  });
});
