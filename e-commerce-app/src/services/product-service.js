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

export const getProducts = async () => {
  try {
    const collectionRef = collection(db, "products"); //reference the "products" collection from db (firstore database)
    const querySnapshot = await getDocs(collectionRef); //fetch all your individual products aka 'docs' from that collection
    console.log(querySnapshot);
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};
