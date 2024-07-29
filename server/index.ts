import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import indexRoutes from "./src/api/routes/index.routes";
import { errorHandler } from "./src/handlers/errors/errorHandler";
import helmet from "helmet";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 7000;
const frontendUrl = process.env.FRONTEND_BASE_URL;

// Use helmet for security headers
app.use(helmet());
app.use(cookieParser());

// Configure CORS to allow requests from the frontend URL
app.use(
  cors({
    origin: "https://practice-frontend-flax.vercel.app",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to set CORS headers for static files
app.use(
  "/uploads/music",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", frontendUrl);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Cross-Origin-Resource-Policy", "cross-origin"); // Add this header

    next();
  },
  express.static("uploads/music")
);

app.use(express.json());

export const prisma = new PrismaClient();
app.use("/api/v1", indexRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
