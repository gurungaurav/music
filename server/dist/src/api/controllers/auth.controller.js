"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const bcryptPass_1 = require("../utils/bcryptPass");
const user_service_1 = require("../services/user.service");
const successHandler_1 = require("../../handlers/success/successHandler");
const customError_1 = __importDefault(require("../../handlers/errors/customError"));
const token_manager_1 = require("../utils/token-manager");
//!Class for controlling authentication and authorization like login, regi,logout, refresh tokens, etc.
class AuthController {
    constructor() {
        //For registration of the user
        this.registerUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userDTO = req.body;
                const hashedPass = yield (0, bcryptPass_1.hashPassword)(userDTO.password);
                const hashedUser = Object.assign(Object.assign({}, userDTO), { password: hashedPass });
                const userAddition = yield user_service_1.userService.registerUser(hashedUser);
                if (userAddition) {
                    return (0, successHandler_1.successHandler)(res, 201, null, "User registered successfully.");
                }
                else {
                    throw new customError_1.default("User registration failed", 400);
                }
            }
            catch (e) {
                next(e);
            }
        });
        this.loginUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const injectDTO = req.user;
                const userDTO = req.body;
                const passCheck = yield (0, bcryptPass_1.checkPassword)(userDTO.password, injectDTO.password);
                if (!passCheck) {
                    throw new customError_1.default("Password did'not matched", 400);
                }
                const jwtPayload = {
                    name: injectDTO.name,
                    id: injectDTO.id,
                    email: injectDTO.email,
                    picture: injectDTO.picture,
                };
                const jwt = (0, token_manager_1.jwtRefreshCreation)(jwtPayload);
                const accessToken = (0, token_manager_1.jwtAccessCreation)(jwtPayload);
                const userDetails = {
                    id: injectDTO.id,
                    name: injectDTO.name,
                    email: injectDTO.email,
                    picture: injectDTO.picture,
                    token: accessToken,
                };
                res.cookie("token", jwt, {
                    httpOnly: true, // Must be false to access in JS
                    secure: true, // For local development. Set to true in production with HTTPS
                    sameSite: "strict",
                    maxAge: 24 * 60 * 60 * 1000, //For a day 24 hrs
                });
                (0, successHandler_1.successHandler)(res, 201, userDetails, "User logged in successfully!");
            }
            catch (e) {
                next(e);
            }
        });
        //!This is for generating access token
        this.generateAccessToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies.token;
                if (!refreshToken) {
                    throw new customError_1.default("No refresh token received", 401);
                }
                const verifiedToken = (0, token_manager_1.jwtRefreshVerification)(refreshToken);
                if (!verifiedToken) {
                    throw new customError_1.default("Unauthorized", 500);
                }
                const user = yield user_service_1.userService.getUserByEmail(verifiedToken.email);
                if (!user) {
                    throw new customError_1.default("User not found", 404);
                }
                const jwtPayload = {
                    id: user.id,
                    email: user.email,
                };
                const accessToken = (0, token_manager_1.jwtAccessCreation)(jwtPayload);
                return (0, successHandler_1.successHandler)(res, 201, accessToken, "Access token received");
            }
            catch (e) {
                next(e);
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cookies = req.cookies;
                if (!(cookies === null || cookies === void 0 ? void 0 : cookies.token))
                    throw new customError_1.default("No token recieved", 204); //No content
                res.clearCookie("token", {
                    httpOnly: true,
                    sameSite: "strict",
                    secure: true,
                });
                return (0, successHandler_1.successHandler)(res, 200, null, "Cookie cleared logged out");
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map