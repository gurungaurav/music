import { Router } from "express";
import { userRoutes } from "./user.routes";
import { musicRoutes } from "./music.routes";
import { authRoutes } from "./auth.routes";

const indexRoutes = Router();

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/music", musicRoutes);
indexRoutes.use("/auth", authRoutes);
export default indexRoutes;
