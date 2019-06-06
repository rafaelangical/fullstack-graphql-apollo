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