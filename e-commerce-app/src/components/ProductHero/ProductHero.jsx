import VariantSelectForm from "../VariantSelectForm/VariantSelectForm";
import classes from "./ProductHero.module.scss";

const ProductHero = ({ productInfo }) => {
  const allVariants = productInfo.variantData;
  const defaultVariant = allVariants[0];
  const productDescription = productInfo.description;

  //debugging
  // console.log(productInfo);
  // console.log(allVariants);
  // console.log(productDescription);

  // console.log("productId: " + productInfo.id);
  // console.log("variantId: " + defaultVariant.variantId);
  // console.log("Product Info:", productInfo); // Check full product data
  //console.log("Product ID:", productInfo.id); // Verify ID exists
  //console.log("Default Variant:", productInfo.variantData[0]); // Check variant data

  return (
    <>
      <section className={classes.hero}>
        <span className={classes.carousel}>
          <img
            src={allVariants[0].variantImgLink}
            alt={allVariants[0].variantName}
          />
        </span>
        <span className={classes.sideInfo}>
          <div className={classes.form}>
            <h2 className={classes.title}>{productInfo.name}</h2>
            <p>Rating: {productInfo.rating}</p>
            <p>Price: ${productInfo.price}</p>
            <p>Category: {productInfo.productType}</p>
            <VariantSelectForm
              productInfo={productInfo}
              variantData={productInfo.variantData}
            />
          </div>
        </span>
      </section>
    </>
  );
};

export default ProductHero;
