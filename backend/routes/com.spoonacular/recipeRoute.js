import express from "express";

import { RecipeController } from "../../controllers/index.js";
import { restAPI as middlewareRestAPI } from "../../middleware/index.js";

const recipeRouter = express.Router();

recipeRouter.get(
  "/recipe/:id/information",
  // Middleware
  middlewareRestAPI.validateReqParamsId,
  // Controller -> DAO
  RecipeController.apiGetRecipeById_Information
);

recipeRouter.get(
  "/recipe/autocomplete",
  // Middleware
  middlewareRestAPI.validateReqPayload( 'spoonacular_query_key' ),
  // Controller -> DAO
  RecipeController.apiGetRecipeMatchByKey
);

recipeRouter.get(
  "/recipe/:id/instruction",
  // Middleware
  middlewareRestAPI.validateReqParamsId,
  // Controller -> DAO
  RecipeController.apiGetRecipeById_Instruction
);

recipeRouter.get(
  "/recipe/ingredients",
  // Middleware
  middlewareRestAPI.validateReqPayload( 'spoonacular_body_ingredients' ),
  middlewareRestAPI.validateReqQuery( 'spoonacular_query_number' ),
  // Controller -> DAO
  RecipeController.apiGetRecipeByIngredients
);

export default recipeRouter;