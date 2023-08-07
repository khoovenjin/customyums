import mongoose from "mongoose";

import RecipeSchema from "./recipeModel.js";
import { dbTables } from "../config/config.js";

const DietarySchema = new mongoose.Schema({
  dietary_id: mongoose.Schema.Types.ObjectId,
  user_id: mongoose.Schema.Types.ObjectId,
  meal: String,
  date: Date,
  recipes: [ RecipeSchema ],
  isCompleted: mongoose.Schema.Types.Boolean
}, {
  versionKey: false
})

const Dietary = mongoose.model( dbTables.DIETARY, DietarySchema );

export default Dietary;