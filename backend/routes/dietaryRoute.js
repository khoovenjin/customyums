import express from "express";

import { DietaryController } from "../controllers/index.js";
import { restAPI as middlewareRestAPI } from "../middleware/index.js";

const dietaryRouter = express.Router();

dietaryRouter.get("/dietaries", DietaryController.apiGetDietaries);
dietaryRouter.get(
  "/dietaries/:id",
  // Middleware
  middlewareRestAPI.validateReqParamsId,
  // Controller -> DAO
  DietaryController.apiGetDietariesById
);

dietaryRouter.post(
  "/dietaries",
  // Middleware
  middlewareRestAPI.validateReqPayload( "dietary" ),
  // Controller -> DAO
  DietaryController.apiAddDietary
);

dietaryRouter.put(
  "/dietaries/:id",
  // Middleware
  middlewareRestAPI.validateReqParamsId,
  middlewareRestAPI.validateReqPayload( "dietary" ),
  // Controller -> DAO
  DietaryController.apiUpdateDietary
);

dietaryRouter.delete(
  "/dietaries/:id", 
  // Middleware
  middlewareRestAPI.validateReqParamsId,
  middlewareRestAPI.validateReqPayload( "recipe" ),
  // Controller -> DAO
  DietaryController.apiDeleteDietary
);

export default dietaryRouter;