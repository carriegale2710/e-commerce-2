import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import React from "react";
import HomePage from "./HomePage";
import { prettyDOM } from "@testing-library/react";

// Mock child components
vi.mock("../../containers/ProductsLoader/ProductsLoader", () => ({
  default: ({ setProducts, setLoading, setError }) => (
    <div data-testid="products-loader" />
  ),
}));
vi.mock("../../components/ProductsGrid/ProductsGrid", () => ({
  default: ({ products }) => (
    <div data-testid="products-grid">{products.length} products</div>
  ),
}));
vi.mock("../../components/ProductsCarousel/ProductsCarousel", () => ({
  default: ({ products }) => (
    <div data-testid="products-carousel">{products.length} products</div>
  ),
}));

describe("HomePage", () => {
  it("renders main headings", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { name: /bestn’beaute/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Sale On Now!/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /All products/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Browse all our products!/i)).toBeInTheDocument();
  });

  it("renders ProductsLoader", () => {
    render(<HomePage />);
    expect(screen.getByTestId("products-loader")).toBeInTheDocument();
  });

  it("renders ProductsCarousel and ProductsGrid when not loading or error", () => {
    render(<HomePage />);
    expect(screen.getByTestId("products-carousel")).toBeInTheDocument();
    expect(screen.getByTestId("products-grid")).toBeInTheDocument();
  });
});
