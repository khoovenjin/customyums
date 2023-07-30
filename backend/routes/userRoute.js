import express from "express";

import { UserController } from "../controllers/index.js";
import { restAPI as middlewareRestAPI } from "../middleware/index.js";

const userRouter = express.Router();

userRouter.get("/users", UserController.apiGetUsers);
userRouter.get(
    "/users/:id",
    // Middleware
    middlewareRestAPI.validateReqParamsId,
    // Controller -> DAO
    UserController.apiGetUsersById
);

userRouter.post(
    "/users",
    // Middleware
    middlewareRestAPI.validateReqPayload( "user" ),
    // Controller -> DAO
    UserController.apiAddUser
);

userRouter.put(
    "/users/:id",
    // Middleware
    middlewareRestAPI.validateReqParamsId,
    middlewareRestAPI.validateReqPayload( "user" ),
    // Controller -> DAO
    UserController.apiUpdateUser
);

userRouter.delete(
    "/users/:id", 
    // Middleware
    middlewareRestAPI.validateReqParamsId,
    // Controller -> DAO
    UserController.apiDeleteUser
);

export default userRouter;