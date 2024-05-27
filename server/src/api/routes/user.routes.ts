import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { checkUserExistence } from "../middlewares/user.middleware";
import { userValidation } from "../validations/user.validaton";
import { userRegisterSchema } from "../schemas/user.schema";

export const userRoutes = Router();

userRoutes.get("/getUser", userController.getUserDetails);

userRoutes.post(
  "/registerUser",
  userValidation.userRegisterValidation(userRegisterSchema),
  checkUserExistence,
  userController.registerUser
);

userRoutes.get("/getSpecificUser/:user_id", userController.getSpecificUser);
