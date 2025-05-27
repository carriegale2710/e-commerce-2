import { render, screen } from "@testing-library/react";
import { ProductsContext } from "./ProductsProvider";
import ProductsProvider from "./ProductsProvider";
import { useContext } from "react";

// Mock useQuery and getAllProducts
vi.mock("../hooks/useQuery", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    products: [{ id: "1", name: "Test Product" }],
    loading: false,
    error: null,
  })),
}));

function TestComponent() {
  const { products, loading, error } = useContext(ProductsContext);
  return (
    <div>
      <span data-testid="products-length">{products.length}</span>
      <span data-testid="loading">{loading ? "yes" : "no"}</span>
      <span data-testid="error">{error ? "yes" : "no"}</span>
    </div>
  );
}

describe("ProductsProvider", () => {
  it("provides products, loading, and error from useQuery", () => {
    render(
      <ProductsProvider>
        <TestComponent />
      </ProductsProvider>
    );
    expect(screen.getByTestId("products-length").textContent).toBe("1");
    expect(screen.getByTestId("loading").textContent).toBe("no");
    expect(screen.getByTestId("error").textContent).toBe("no");
  });
});
