import mongoose from "mongoose";

const NutritionSchema = new mongoose.Schema({
  title: String,
  amount: Number
}, {
  versionKey: false
})

export default NutritionSchema;