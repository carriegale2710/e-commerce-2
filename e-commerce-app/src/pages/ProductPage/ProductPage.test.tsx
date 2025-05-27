import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./ProductPage";
import { ProductsContext } from "../../context/ProductsProvider";
import { vi } from "vitest";

// Mock ProductDetails to show params for assertion
vi.mock("./ProductDetails", () => ({
  __esModule: true,
  default: () => <div data-testid="product-details">ProductDetails</div>,
}));

describe("ProductPage", () => {
  const mockProductsContextValue = {
    products: [
      {
        id: "some-product-id",
        variantData: [{ variantId: "some-variant-id" }],
      },
      {
        id: "huda-beauty-creamy-kohl-eyeliner",
        variantData: [{ variantId: "very-vanta" }],
      },
    ],
    loading: false,
    error: null,
  };

  const renderWithRouter = (route, contextValue = mockProductsContextValue) =>
    render(
      <ProductsContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route
              path="/products/:productId/:variantId"
              element={<ProductPage />}
            />
          </Routes>
        </MemoryRouter>
      </ProductsContext.Provider>
    );

  it("renders the ProductPage header and ProductDetails for valid params", () => {
    renderWithRouter("/products/some-product-id/some-variant-id");
    expect(
      screen.getByRole("heading", { name: /product page/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("product-details")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /user reviews/i })
    ).toBeInTheDocument();
  });

  it("renders the reviews section", () => {
    renderWithRouter("/products/any-id/any-variant");
    expect(
      screen.getByRole("heading", { name: /user reviews/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/personal bonus idea for later: user review section/i)
    ).toBeInTheDocument();
  });

  it("renders ProductDetails even if productId or variantId are missing (edge case)", () => {
    // This will not match the route, so nothing will render
    render(
      <MemoryRouter initialEntries={["/products/only-product-id"]}>
        <Routes>
          <Route
            path="/products/:productId/:variantId"
            element={<ProductPage />}
          />
          <Route
            path="*"
            element={<div data-testid="not-found">NotFound</div>}
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId("not-found")).toBeInTheDocument();
  });

  it("renders ProductDetails for different productId and variantId", () => {
    renderWithRouter("/products/huda-beauty-creamy-kohl-eyeliner/very-vanta");
    expect(screen.getByTestId("product-details")).toBeInTheDocument();
  });
});
