import mongoose from "mongoose";

import NutritionSchema from "./nutritionModel.js";
import IngredientSchema from "./ingredientModel.js";

const RecipeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  recipe_id: String,
  title: String,
  description: String,
  image: String,
  tags: [ String ], // Uses cuisine, meal types and diet types
  time: Number,
  nutrition: [ NutritionSchema ],
  ingredients: [ IngredientSchema ],
  steps: [ String ]
}, {
  versionKey: false
})

export default RecipeSchema;