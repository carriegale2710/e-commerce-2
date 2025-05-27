import { useState, useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import classes from "./VariantSelectForm.module.scss";

const VariantSelectForm = ({ productInfo, variantData }) => {
  // props needed: product data user is interested in adding
  // const allVariants = productInfo.variantData;
  // console.log(productInfo);
  //console.log(productInfo.name, variantData);

  const [selectedVariant, setSelectedVariant] = useState("");
  const { addItemToCart, updateFavoritedItems, favsList } =
    useContext(CartContext);
  const isFavorited = favsList.includes(productInfo.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Adding ${selectedVariant} to cart...`);
    //call addItemToCart from cartContext here
    const success = addItemToCart(productInfo, selectedVariant);
    if (!success) {
      alert(`Sorry, ${selectedVariant} is out of stock...`);
    } else {
      console.log(`${selectedVariant} added to cart!`);
    }
  };

  //for the favorite button click
  const toggleClick = () => {
    if (!isFavorited) {
      console.log("added to favorites");
    } else {
      console.log("removed from favorites");
    }
    updateFavoritedItems(productInfo.id);
  };

  //handles variant-picker user selection
  const handleChange = (e) => {
    const newVariant = e.target.value;
    setSelectedVariant(newVariant);
    console.log(`shade updated to: ${newVariant}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/*dropdown element for picking the product variant (shade)*/}
        <label htmlFor="variant-picker">Select shade</label> <br />
        <select
          onChange={handleChange}
          name="variant-picker"
          id="variant-picker"
          value={selectedVariant}
        >
          {variantData.map((v, index) => {
            // console.log(`${v.productVariantId}-${index}`);
            return (
              <option
                key={`${v.productVariantId}-${index}`}
                value={v.variantId}
              >
                Shade: {v.variantName}, In stock: {v.variantStockAvailable}{" "}
              </option>
            );
          })}
        </select>
        <button className={classes.addButton} type="submit">
          Add to Cart
        </button>
      </form>
      <button
        className={`${classes.favButton} ${isFavorited ? classes.active : ""}`}
        onClick={toggleClick}
      >
        Fav
      </button>
    </div>
  );
};

export default VariantSelectForm;
