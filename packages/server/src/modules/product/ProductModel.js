import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  _id: Schema.Types.ObjectId,
  price: Number,
  description: String,
  barcode: String,
  name: String,
  ts: Date
});

export default mongoose.model("Product", productSchema);
