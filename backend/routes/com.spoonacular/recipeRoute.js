import express from "express";

import { RecipeController } from "../../controllers/index.js";
import { restAPI as middlewareRestAPI } from "../../middleware/index.js";

const recipeRouter = express.Router();

recipeRouter.get(
  "/recipe/:id/information",
  RecipeController.apiGetRecipeById_Information
);

recipeRouter.get(
  "/recipe/autocomplete",
  // Middleware
  middlewareRestAPI.validateReqQuery( 'spoonacular_query_key' ),
  // Controller -> DAO
  RecipeController.apiGetRecipeMatchByKey
);

recipeRouter.get(
  "/recipe/:id/instruction",
  RecipeController.apiGetRecipeById_Instruction
);

recipeRouter.get(
  "/recipe/ingredients",
  // Middleware
  middlewareRestAPI.validateReqQuery( 'spoonacular_query_ingredients' ),
  // Controller -> DAO
  RecipeController.apiGetRecipeByIngredients
);

recipeRouter.get(
  "/recipe/random",
  // Middleware
  middlewareRestAPI.validateReqQuery( 'spoonacular_query_random' ),
  // Controller -> DAO
  RecipeController.apiGetRandomRecipe
);

export default recipeRouter;