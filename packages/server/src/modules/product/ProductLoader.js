import mongoose from "mongoose";
import ProductModel from "./ProductModel";

const { ObjectId } = mongoose.Types;

export const addProduct = ({ price, name, description, barcode }) => {
  const _id = new ObjectId();
  const ts = new Date();
  const product = new ProductModel({ name, price, description, barcode, _id, ts });
  return product.save();
};

export const loadAllProducts = () => {
  return ProductModel.find({})
    .then(result => {
      return result;
    });
};

export const getProductDetails = async id => {
  let product = [];
  try {
    product = await ProductModel.findById(id);
    console.log("product", product);
  } catch (error) {
    console.log("error", error);
  }
 
  //if (!product) {
    //return null;
  //}
  return product;
 };