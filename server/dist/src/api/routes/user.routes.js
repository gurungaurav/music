"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.get("/getUser", user_controller_1.userController.getUserDetails);
exports.userRoutes.get("/getSpecificUser/:id", user_controller_1.userController.getSpecificUser);
exports.userRoutes.get("/getUserWithMusic/:id", user_controller_1.userController.getSpecificUserWithMusic);
exports.userRoutes.get("/getSideBarArtists", user_controller_1.userController.sideBarArtists);
//# sourceMappingURL=user.routes.js.map