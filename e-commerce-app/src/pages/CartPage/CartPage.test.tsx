import { render, screen } from "@testing-library/react";
import CartPage from "./CartPage";

// Mock child components
vi.mock("../../components/CartList/CartList", () => ({
  default: () => <div data-testid="cart-list" />,
}));
vi.mock("../../containers/CheckOutForm/CheckOutForm", () => ({
  default: () => <form data-testid="checkout-form" />,
}));

describe("CartPage", () => {
  it("renders CartList", () => {
    render(<CartPage />);
    expect(screen.getByTestId("cart-list")).toBeInTheDocument();
  });

  it("renders CheckOutForm", () => {
    render(<CartPage />);
    expect(screen.getByTestId("checkout-form")).toBeInTheDocument();
  });
});
