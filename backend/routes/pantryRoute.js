import express from "express";

import { PantryController } from "../controllers/index.js";
import { restAPI as middlewareRestAPI } from "../middleware/index.js";

const pantryRouter = express.Router();

pantryRouter.get("/pantries", PantryController.apiGetPantries);
pantryRouter.get(
    "/pantries/:id",
    // Middleware
    middlewareRestAPI.validateReqParamsId,
    // Controller -> DAO
    PantryController.apiGetPantriesById
);

pantryRouter.post(
    "/pantries",
    // Middleware
    middlewareRestAPI.validateReqPayload( "pantry" ),
    // Controller -> DAO
    PantryController.apiAddPantry
);

pantryRouter.put(
    "/pantries/:id",
    // Middleware
    middlewareRestAPI.validateReqParamsId,
    middlewareRestAPI.validateReqPayload( "pantry" ),
    // Controller -> DAO
    PantryController.apiUpdatePantry
);

pantryRouter.delete(
    "/pantries/:id", 
    // Middleware
    middlewareRestAPI.validateReqParamsId,
    // Controller -> DAO
    PantryController.apiDeletePantry
);

export default pantryRouter;