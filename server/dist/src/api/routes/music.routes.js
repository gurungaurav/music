"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicRoutes = void 0;
const express_1 = require("express");
const jwt_middleware_1 = require("../middlewares/jwt.middleware");
const music_controller_1 = require("../controllers/music.controller");
const multer_manager_1 = require("../utils/multer-manager");
exports.musicRoutes = (0, express_1.Router)();
const upload = (0, multer_manager_1.createMulterUpload)("uploads/music");
const uploadFields = upload.fields([
    { name: "url", maxCount: 1 },
    { name: "image", maxCount: 1 },
]);
exports.musicRoutes.post("/addMusic", uploadFields, jwt_middleware_1.verifyAccessJwtTokenMiddleware, music_controller_1.musicController.addMusic);
exports.musicRoutes.get("/getHome/:id", music_controller_1.musicController.getAllHomeDetails);
//# sourceMappingURL=music.routes.js.map