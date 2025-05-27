import React, { createContext, useState } from "react";
export const CartContext = createContext(/*null */); //context shared across entire pp

export const CartProvider = ({ children }) => {
  //state management
  const [cart, setCart] = useState([]);
  const [favsList, setFavsList] = useState([]);
  //console.log(`Current Cart: ${cart.map((item) => item.id)}`);
  //console.log(`Current FavsList: ${favsList.map((item) => item.id)}`);

  const checkStockAvailability = (productItem, selectedVariant) => {
    //- needs to check if the qty =< stock for the selectedVariant
    // if number of items for THAT SPECIFIC VARIANT existing in cart EXCEEDS stock available (based on stock prop), return true
    /* LOGIC:
    1. check the stock available for selected variant
    2. check item already exists in array, -> use find() with specific product id
    3. if yes just increment the qty prop by 1 -> spread and update the qty prop
     */
    const numOfItemsInCart = cart.filter(
      (item) =>
        item.id === productItem.id && item.selectedVariant === selectedVariant
    ).length;

    const notEnoughStock =
      productItem.stock[selectedVariant] > numOfItemsInCart;

    return notEnoughStock;
  };

  const addItemToCart = (productItem, selectedVariant) => {
    // NOTE addToCart() - user adds item to cart by clicking button
    //props come from a form: user selects product (page/card), variant (dropdown) and qty needed (button)
    // + selectedQty?

    //check how much stock is available for this variant
    // - should not be exceeded by selectedQty + no. already in cart
    //bonus: if stock falls to zero, should the variant option be automatically greyed out/unselectable from dropdown menu?

    //if not enough stock, display error message
    if (!checkStockAvailability(productItem, selectedVariant)) {
      // + selectedQty?
      console.log("run out of stock - check again later");
      return false; //fail
    }

    //if enough stock, add to the cartList
    console.log(`Adding to cart: ${productItem.id}`);

    //create new prop to identify what variant the user chose to add to cart
    const itemWithVariant = {
      ...productItem,
      selectedVariant: selectedVariant,
      // + selectedQty: selectedQty, ?
    };

    // update the cart with added item
    setCart((prevCart) => [...prevCart, itemWithVariant]); // + selectedQty:?

    return true; //successfully added
  };

  //NOTE - Remove 1 item from the cartList
  const removeItemFromCart = (itemId) => {
    // decrement the qty -1
    // if it turns to 0, then remove the ItemCard altogether
    // (or should only show if qty >= 1)?
    const removedCart = (prevCart) =>
      prevCart.filter((item) => item.id !== itemId);
    setCart(removedCart);
  };

  //NOTE - Remove ALL items from the cartList
  const clearCart = () => {
    setCart([]);
  };

  //NOTE - Total price of ALL items from the cartList
  const getTotalCartPrice = () => {
    return cart.reduce((total, item) => {
      const variantTotal = item.price * item.quantity;
      return total + variantTotal;
    }, 0);
  };

  //NOTE - favorite button -> bonus idea: wishlist page later
  const updateFavoritedItems = (productId) => {
    setFavsList((prevFavsList) => {
      if (prevFavsList.includes(productId)) {
        // Remove from favorites if already favorited
        return prevFavsList.filter((id) => id !== productId);
      } else {
        // Add to favorites if not favorited
        return [...prevFavsList, productId];
      }
    });
  };

  //NOTE - this makes sure the context and its functions are available everywhere in the app
  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        getTotalCartPrice,
        checkStockAvailability,
        favsList,
        updateFavoritedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* Which components are using these functions? - use to debug your code

1. App.jsx - Wraps around whole App
2. CartPage.jsx - Wraps CartList component which uses CartContext
3. CartList.jsx - Uses cart state and functions for displaying/managing cart items
  - Using cart, clearCart, getTotalCartPrice
4. VariantSelectForm.jsx - Uses cart functions for adding items and managing favorites
 - using  addItemToCart, updateFavoritedItems, favsList


 For debugging stock:
  Try adding an item to cart
  Check console logs for:
  Current items in cart
  Available stock
  Any error messages
  Verify that you can't add more items than available stock


*/
