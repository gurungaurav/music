import { Router } from "express";
import { userRoutes } from "./user.routes";

const indexRoutes = Router();

indexRoutes.use("/user", userRoutes);

export default indexRoutes;
