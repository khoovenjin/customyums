import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  title: String,
  amount: Number
}, {
  versionKey: false
})

export default IngredientSchema;