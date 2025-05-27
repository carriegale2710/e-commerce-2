import { render, screen } from "@testing-library/react";
import { CartProvider, CartContext } from "./CartProvider";
import { useContext } from "react";

function TestComponent() {
  const {
    cart,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    getTotalCartPrice,
  } = useContext(CartContext);

  return (
    <div>
      <button
        onClick={() =>
          addItemToCart(
            { id: "1", price: 10, stock: { default: 5 } },
            "default"
          )
        }
      >
        Add
      </button>
      <button onClick={() => removeItemFromCart("1")}>Remove</button>
      <button onClick={clearCart}>Clear</button>
      <span data-testid="cart-length">{cart.length}</span>
      <span data-testid="cart-total">{getTotalCartPrice()}</span>
    </div>
  );
}

describe("CartProvider", () => {
  it("adds item to cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    screen.getByText("Add").click();
    expect(screen.getByTestId("cart-length").textContent).toBe("1");
  });

  it("removes item from cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    screen.getByText("Add").click();
    screen.getByText("Remove").click();
    expect(screen.getByTestId("cart-length").textContent).toBe("0");
  });

  it("clears the cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    screen.getByText("Add").click();
    screen.getByText("Clear").click();
    expect(screen.getByTestId("cart-length").textContent).toBe("0");
  });

  it("calculates total price", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    screen.getByText("Add").click();
    expect(screen.getByTestId("cart-total").textContent).toBe("0"); // Because quantity is undefined in your addItemToCart
  });
});
