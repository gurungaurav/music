import { Router } from "express";
import { verifyAccessJwtTokenMiddleware } from "../middlewares/jwt.middleware";
import { musicController } from "../controllers/music.controller";
import { createMulterUpload } from "../utils/multer-manager";

export const musicRoutes = Router();

const upload = createMulterUpload("uploads/music");
const uploadFields = upload.fields([
  { name: "url", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

musicRoutes.post(
  "/addMusic",
  uploadFields,
  verifyAccessJwtTokenMiddleware,
  musicController.addMusic
);

musicRoutes.get("/getHome/:id", musicController.getAllHomeDetails);
