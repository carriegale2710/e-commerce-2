import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import CartItemCard from "../CartItemCard/CartItemCard";
import classes from "./CartList.module.scss";

const CartList = () => {
  const { cart, clearCart, totalPrice, getTotalCartPrice } =
    useContext(CartContext);
  // console.log(cart);

  const handleClick = () => {
    console.log("clicked");
    clearCart();
  };

  const JSONstring = JSON.stringify(cart, null, 2);
  return (
    <>
      <div className={classes.container}>
        <h2>Your Cart Items</h2>
        <section className={classes.list}>
          {cart.map((item, i) => (
            <CartItemCard key={i} productData={item} />
          ))}
        </section>
        <p>Total: ${getTotalCartPrice().toFixed(2)}</p>
      </div>
      {cart.length > 0 && (
        <button className="hidden" onClick={handleClick}>
          Clear Cart
        </button>
      )}
      {/* <pre className={classes.dataPreview}>{JSONstring}</pre> */}
    </>
  );
};

export default CartList;
