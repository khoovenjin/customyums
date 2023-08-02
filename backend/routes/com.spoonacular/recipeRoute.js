import express from "express";

import RecipeController from "../../controllers/com.spoonacular/recipeController.js";

const recipeRouter = express.Router();

recipeRouter.get( "/recipe/:id/information", RecipeController.apiGetRecipeById_Information );

recipeRouter.get( "/recipe/autocomplete", RecipeController.apiGetRecipeMatchByKey );

recipeRouter.get( "/recipe/:id/instruction", RecipeController.apiGetRecipeById_Instruction );

export default recipeRouter;