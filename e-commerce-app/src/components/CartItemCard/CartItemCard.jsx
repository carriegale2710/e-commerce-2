import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import classes from "./CartItemCard.module.scss";

const CartItemCard = ({ productData }) => {
  //input - single specific product with a selectedVariant prop
  console.log(productData);
  const { selectedVariant, variantData } = productData;
  console.log(selectedVariant, variantData);

  const { cart, removeItemFromCart } = useContext(CartContext);
  //console.log(cart);

  const matchingVariant = () => {
    //returns the variant object that user selected
    return productData.variantData.find(
      (variant) => variant.productVariantId === productData.selectedVariant
    );
  };

  console.log(matchingVariant());

  const handleClick = () => {
    console.log("clicked");
    removeItemFromCart(productData.id);
  };

  return (
    <>
      <div className={`${classes.card}`}>
        <span className={classes.details}>
          {/* <p>{productData.id}</p> */}
          <a href={productData.productURL}>
            <p>{productData.name}</p>
          </a>
          <p>{`Shade: ${matchingVariant().variantName}`}</p>
          <p>${productData.price.toFixed(2)}</p>
          <p>Qty: {productData.quantity}</p>
        </span>
        {/* add counter for increment, decrement */}
        <button className={classes.button} onClick={handleClick}>
          Remove
        </button>
      </div>
      <br />
    </>
  );
};

export default CartItemCard;
