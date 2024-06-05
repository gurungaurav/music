import { Router } from "express";
import { userRoutes } from "./user.routes";
import { musicRoutes } from "./music.routes";

const indexRoutes = Router();

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/music", musicRoutes);
export default indexRoutes;
