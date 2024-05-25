// src/index.js
import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

export const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Express + TypeScript Servers");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
