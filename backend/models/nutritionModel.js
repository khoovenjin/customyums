import mongoose from "mongoose";

const NutritionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  amount: Number
}, {
  versionKey: false
})

export default NutritionSchema;