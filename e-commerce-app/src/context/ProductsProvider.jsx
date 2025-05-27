import { createContext } from "react";
import useQuery from "../hooks/useQuery";
import { getAllProducts } from "../services/product-services";

export const ProductsContext = createContext(null);

export default function ProductsProvider({ children }) {
  //console.log("ProductsProvider rendering"); // Debug log
  const { products, loading, error /*, isFail, isLoading, isSuccess*/ } =
    useQuery({
      fetchFn: getAllProducts,
    });

  //console.log("Provider state:", { products, loading, error });

  return (
    <ProductsContext
      value={{ products, loading, error /*, isFail, isLoading, isSuccess */ }}
    >
      {children}
    </ProductsContext>
  );
}
