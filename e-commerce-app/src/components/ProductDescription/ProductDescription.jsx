import React from "react";
import classes from "./ProductDescription.module.scss";

const ProductDescription = ({ productDescription }) => {
  return (
    <section className={classes.description}>
      <header>
        <h2>Description</h2>
      </header>
      <div>
        <h4>Benefits</h4>
        <p>{productDescription.benefits}</p>
      </div>
      <div>
        <h4>Finish</h4>
        <p>{productDescription.finish}</p>
      </div>
      <div>
        <h4>What it Is</h4>
        <p>{productDescription.whatItIs}</p>
      </div>
      <div>
        <h4>What it Does</h4>
        <p>{productDescription.whatItDoes}</p>
      </div>
      <div>
        <h4>What it Includes</h4>
        <p>{productDescription.WhatItIncludes}</p>
      </div>
    </section>
  );
};

export default ProductDescription;
