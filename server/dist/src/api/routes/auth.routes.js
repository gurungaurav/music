"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const user_middleware_1 = require("../middlewares/user.middleware");
const user_validaton_1 = require("../validations/user.validaton");
const user_schema_1 = require("../schemas/user.schema");
const loginLimiter_middleware_1 = require("../middlewares/loginLimiter.middleware");
const auth_controller_1 = require("../controllers/auth.controller");
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.post("/registerUser", user_validaton_1.userValidation.userRegisterValidation(user_schema_1.userRegisterSchema), user_middleware_1.checkUserExistence, auth_controller_1.authController.registerUser);
exports.authRoutes.post("/loginUser", loginLimiter_middleware_1.loginLimiter, user_validaton_1.userValidation.userLoginValidation(user_schema_1.userLoginSchema), user_middleware_1.checkUserLogin, auth_controller_1.authController.loginUser);
exports.authRoutes.get("/refresh", auth_controller_1.authController.generateAccessToken);
exports.authRoutes.post("/logout", auth_controller_1.authController.logout);
//# sourceMappingURL=auth.routes.js.map