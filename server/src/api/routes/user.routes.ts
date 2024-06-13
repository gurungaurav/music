import { Router } from "express";
import { userController } from "../controllers/user.controller";

export const userRoutes = Router();

userRoutes.get("/getUser", userController.getUserDetails);

userRoutes.get("/getSpecificUser/:id", userController.getSpecificUser);

userRoutes.get(
  "/getUserWithMusic/:id",
  userController.getSpecificUserWithMusic
);

userRoutes.get("/getSideBarArtists", userController.sideBarArtists);
