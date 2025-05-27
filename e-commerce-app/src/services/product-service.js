import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firestore";

// Responsible for: handling all firestore communication and errors with fetching the database + transforming data
//firestore link: https://console.firebase.google.com/u/0/project/carries-firebase/firestore/databases/-default-/data/~2Fproducts~2FVbKECzzYpbnbyuVBlaNA

// Responsible for: handling all firestore communication and errors with fetching the database + transforming data
export const getAllProducts = async () => {
  try {
    const collectionRef = collection(db, "products"); //reference the "products" collection from db (firstore database)
    const querySnapshot = await getDocs(collectionRef); //fetch all your individual products aka 'docs' from that collection

    //transform, clean the data
    const cleanedData = querySnapshot.docs.map((doc) => {
      //console.log(doc.data());
      const variantNames = doc.data().variants;
      const variantId = variantNames.map((variant) =>
        variant.split(" ").join("-").toLowerCase()
      );

      //destructuring props of each product in database: description, id,imgURL,name, price, productType,productURL, rating,stock, variants
      const { id, name, variants, imgURL, stock, price, rating, ...rest } =
        doc.data();
      // then using these props to clean up VariantData property ->  each product variant into individual objects
      const variantData = variants.map((variant, i) => {
        //console.log(variant);
        return {
          productVariantId: `${id}-${variantId[i]}`,
          variantId: `${variantId[i]}`,
          variantName: variantNames[i],
          variantImgLink: imgURL[i],
          variantStockAvailable: stock[i],
          variantPrice: price,
          isFavorited: false,
        };
      });

      const cleanDoc = {
        id,
        name,
        variants,
        price,
        ...rest,
        variantData,
        isFeatured: rating > 4.4, // added new prop - will turn true if rating above 4.5
      };

      //console.log(rating, cleanDoc);
      return cleanDoc;
    });
    console.log(
      "Fetched + cleaned data from product-services.js: ",
      cleanedData
    );
    return cleanedData; //return the raw data
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};

export const getProductById = async (id) => {
  const docRef = doc(db, "products", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    throw new Error("Could not find product with id " + id);
  }
  return { id: snapshot.id, ...snapshot.data() };
};
