import ProductCard from "../ProductCard/ProductCard";
import classes from "./ProductsGrid.module.scss";

const ProductsGrid = ({ products }) => {
  return (
    <div className={classes.flex}>
      {products.map((product, i) => {
        //console.log(`Loading ${product.name}`);
        return <ProductCard key={i} productInfo={product} />;
      })}
    </div>
  );
};

export default ProductsGrid;
