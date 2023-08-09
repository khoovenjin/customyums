import mongoose from "mongoose";

const NutritionSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  percentageDailyNeed: Number
}, {
  versionKey: false
})

export default NutritionSchema;