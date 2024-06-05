import { Router } from "express";
import { verifyJwtTokenMiddleware } from "../middlewares/jwt.middleware";
import multer from "multer";
import { musicController } from "../controllers/music.controller";

export const musicRoutes = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/music");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const uploadFields = upload.fields([
  { name: "music", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

musicRoutes.post(
  "/addMusic",
  uploadFields,
  verifyJwtTokenMiddleware,
  musicController.addMusic
);
