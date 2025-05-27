import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import classes from "./CartPage.module.scss";
import CartList from "../../components/CartList/CartList";
import CheckOutForm from "../../containers/CheckOutForm/CheckOutForm";

const CartPage = () => {
  return (
    <main className={classes.container}>
      <CartList />
      <CheckOutForm />
    </main>
  );
};

export default CartPage;
