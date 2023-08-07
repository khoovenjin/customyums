import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  recipe_id: String,
  title: String,
  description: String,
  image: String,
  tags: [ String ]
}, {
  versionKey: false
})

export default RecipeSchema;