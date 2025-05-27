//http://vitest.dev/guide/
import { render, screen } from "@testing-library/react";
import App from "./App";
import { vi } from "vitest";

// Mock all child components to isolate App routing
vi.mock("./components/NavBar/NavBar", () => ({
  default: () => <nav data-testid="navbar" />,
}));
vi.mock("./components/Footer/Footer", () => ({
  default: () => <footer data-testid="footer" />,
}));
vi.mock("./pages/HomePage/HomePage", () => ({
  default: () => <div data-testid="home-page">HomePage</div>,
}));
vi.mock("./pages/CartPage/CartPage", () => ({
  default: () => <div data-testid="cart-page">CartPage</div>,
}));
vi.mock("./pages/NotFound/NotFound", () => ({
  default: () => <div data-testid="not-found">NotFound</div>,
}));
// Enhanced ProductPage mock to show params
vi.mock("./pages/ProductPage/ProductPage", () => ({
  default: (props) => {
    // Simulate useParams by reading from window.location
    const match = window.location.pathname.match(
      /\/products\/([^/]+)\/([^/]+)/
    );
    const productId = match ? match[1] : undefined;
    const variantId = match ? match[2] : undefined;
    return (
      <div data-testid="product-page">
        ProductPage
        <span data-testid="product-id">{productId}</span>
        <span data-testid="variant-id">{variantId}</span>
      </div>
    );
  },
}));
vi.mock("./pages/ProductPage/ProductDetails", () => ({
  default: () => <div data-testid="product-details">ProductDetails</div>,
}));

describe("App routing", () => {
  afterEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("renders NavBar and Footer on all routes", () => {
    render(<App />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders HomePage on root route and not other pages", () => {
    window.history.pushState({}, "", "/");
    render(<App />);
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.queryByTestId("cart-page")).not.toBeInTheDocument();
    expect(screen.queryByTestId("product-page")).not.toBeInTheDocument();
    expect(screen.queryByTestId("not-found")).not.toBeInTheDocument();
  });

  it("renders CartPage on /cart route and not other pages", () => {
    window.history.pushState({}, "", "/cart");
    render(<App />);
    expect(screen.getByTestId("cart-page")).toBeInTheDocument();
    expect(screen.queryByTestId("home-page")).not.toBeInTheDocument();
    expect(screen.queryByTestId("product-page")).not.toBeInTheDocument();
    expect(screen.queryByTestId("not-found")).not.toBeInTheDocument();
  });

  it("renders ProductPage on /products/:productId/:variantId route and passes params", () => {
    window.history.pushState({}, "", "/products/abc123/def456");
    render(<App />);
    expect(screen.getByTestId("product-page")).toBeInTheDocument();
    expect(screen.getByTestId("product-id").textContent).toBe("abc123");
    expect(screen.getByTestId("variant-id").textContent).toBe("def456");
    expect(screen.queryByTestId("home-page")).not.toBeInTheDocument();
    expect(screen.queryByTestId("cart-page")).not.toBeInTheDocument();
    expect(screen.queryByTestId("not-found")).not.toBeInTheDocument();
  });

  it("renders ProductDetails on /product-page-dummy route", () => {
    window.history.pushState({}, "", "/product-page-dummy");
    render(<App />);
    expect(screen.getByTestId("product-details")).toBeInTheDocument();
    expect(screen.queryByTestId("home-page")).not.toBeInTheDocument();
    expect(screen.queryByTestId("cart-page")).not.toBeInTheDocument();
    expect(screen.queryByTestId("not-found")).not.toBeInTheDocument();
  });

  it("renders NotFound on unknown route", () => {
    window.history.pushState({}, "", "/some/unknown/path");
    render(<App />);
    expect(screen.getByTestId("not-found")).toBeInTheDocument();
    expect(screen.queryByTestId("home-page")).not.toBeInTheDocument();
    expect(screen.queryByTestId("cart-page")).not.toBeInTheDocument();
    expect(screen.queryByTestId("product-page")).not.toBeInTheDocument();
    expect(screen.queryByTestId("product-details")).not.toBeInTheDocument();
  });

  it("renders NotFound on incomplete product route", () => {
    window.history.pushState({}, "", "/products/");
    render(<App />);
    expect(screen.getByTestId("not-found")).toBeInTheDocument();
  });

  it("renders NotFound when variantId is missing", () => {
    window.history.pushState({}, "", "/products/abc123/");
    render(<App />);
    expect(screen.getByTestId("not-found")).toBeInTheDocument();
  });
});
