import ProductsLoader from "../../containers/ProductsLoader/ProductsLoader";
import classes from "./HomePage.module.scss";
import { useState, useEffect } from "react";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import ProductsCarousel from "../../components/ProductsCarousel/ProductsCarousel";
import { ProductsContext } from "../../context/ProductsProvider";

const HomePage = () => {
  // these states are sent down as props to ProductsLoader (which does the actual fetching)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Products updated:", products);
  }, [products]);

  //(debugging) just to preview data in dev mode
  const JSONstring = JSON.stringify(products, null, 2); //
  //console.log(JSONstring);

  return (
    <main className={classes.container}>
      <div className={classes.header}>
        <h1>bestn’beaute</h1>
        <h2>Sale On Now!</h2>
      </div>
      <ProductsLoader
        setProducts={setProducts}
        setLoading={setLoading}
        setError={setError}
      />
      <section className={classes.container}>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && <ProductsCarousel products={products} />}
      </section>
      <header>
        <h2>All products</h2>
        <p>Browse all our products!</p>
      </header>
      <section className={classes.container}>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && <ProductsGrid products={products} />}
      </section>
    </main>
  );
};

export default HomePage;
