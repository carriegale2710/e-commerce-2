import { useState, useEffect } from "react";

export default function useQuery(fetchFn, args = [], dependencies = []) {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [fetchStatus, setFetchStatus] = useState("Pending");

  const fetchProducts = (firstFetch) => {
    firstFetch && setFetchStatus("Loading"); // loading starts
    console.log("Fetching products..."); // Debug log
    fetchFn(...args) //calls the fetching function from product-services.js
      .then((results) => {
        setProducts(results); // sets the fetched data as variable
        console.log("Set products:", results); //products data JSON string
        setFetchStatus("Success"); // loading finished
      })
      .catch((err) => {
        setFetchStatus("Failure");
        setError(err);
        console.error("Fetch error:", err);
      });
  };

  // useEffect(() => {
  //   console.log("useQuery effect running"); // Debug log
  //   fetchProducts(true);
  // }, dependencies); // loads products on the screen only run on mount (once!!)

  return {
    products,
    error,
    loading: fetchStatus === "Loading",
    // isSuccess: fetchStatus === "Success",
    // isFail: fetchStatus === "Failure",
    // isLoading: fetchStatus === "Loading",
    reset: () => fetchProducts(false),
  };
}
