import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProductsContext } from "../../context/ProductsProvider";
import ProductsLoader from "../../containers/ProductsLoader/ProductsLoader";
import ProductHero from "../../components/ProductHero/ProductHero";
import ProductDescription from "../../components/ProductDescription/ProductDescription";
import classes from "./ProductPage.module.scss";

const ProductDetails = () => {
  //NOTE - STATE MANAGEMENT
  // const { products, loading, error } = useContext(ProductsContext);
  // these states are sent down as props to ProductsLoader (which does the actual fetching)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // NOTE -  DEBUGGING
  console.log("Set products:", products); //preview set array of objects
  useEffect(() => {
    console.log("Products updated:", products); //preview CHANGED objects
  }, [products]);
  // console.log(JSON.stringify(products, null, 2)); //just to preview data as a JSON

  // NOTE -  RENDERING PRODUCT DATA ON PAGE
  //dummy product
  const productId = "huda-beauty-creamy-kohl-eyeliner";
  const variantId = "v/very-vanta";
  // Find product with matching ID and variant
  const product =
    products.length > 0 &&
    products.find(
      (product) =>
        product.id === productId &&
        product.variantData.some((variant) => variant.variantId === variantId)
    );

  return (
    <div className={classes.page}>
      <ProductsLoader
        setProducts={setProducts}
        setLoading={setLoading}
        setError={setError}
      />

      <main className={classes.container}>
        <h2>Product Details</h2>
        <p>Product Details should display here</p>
        <section className={classes.container}>
          {loading && <p>Loading product details...</p>}
          {error && <p>Error loading product: {error}</p>}
          {product ? (
            <>
              <ProductHero productInfo={product} />
              <ProductDescription productDescription={product.description} />
            </>
          ) : (
            <>
              <header className={classes.container}>
                <h2>Product not found</h2>
              </header>
              <div className={classes.error}>
                <p>
                  Product Id was: {productId}
                  <br />
                  Variant Id was: {variantId}
                </p>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProductDetails;
