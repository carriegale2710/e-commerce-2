import { useState, useEffect, useContext } from "react";
import { getAllProducts } from "../../services/product-services";
import classes from "./ProductsLoader.module.scss";

export default function ProductsLoader({ setProducts, setLoading, setError }) {
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      //console.log("Fetched products:", data);
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []); //only run on mount (once!!)
}

// Responsibilities of this container:
// Manages UI state (loading, error, products)
// Handles UI-related side effects
// Renders components
// Manages UI-specific error states

/////Bonus - have an short button 'Add to card' available on the thumbnail of each product (DONE)
// Bonus: would be nice to have a modal display here when clicking 'Quick View' on each product
