import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  hash: String,
  age: Number,
  cpf: String
});

export default mongoose.model("User", userSchema);
