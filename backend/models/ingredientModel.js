import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  amount: Number
}, {
  versionKey: false
})

export default IngredientSchema;