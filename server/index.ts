// src/index.js
import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import indexRoutes from "./src/api/routes/index.routes";
import { errorHandler } from "./src/handlers/errors/errorHandler";
import helmet from "helmet";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

//!Middlewares
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/uploads/music", express.static("uploads/music"));
app.use(express.json());

export const prisma = new PrismaClient();
app.use("/api/v1", indexRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
