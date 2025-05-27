import ProductCard from "../ProductCard/ProductCard";
import classes from "./ProductsCarousel.module.scss";

const ProductsCarousel = ({ products }) => {
  return (
    <>
      <h2>Featured Products</h2>
      <div className={classes.flex}>
        <ul>
          {products.map((product, i) => {
            //console.log(product.isFeatured);
            return (
              product.isFeatured && (
                <li key={`${product.id}_carousel_${i}`}>
                  <ProductCard productInfo={product} />
                </li>
              )
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ProductsCarousel;

//reused similar format from ProductsGrid, just gave it some different styling
