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
exports.verifyAccessJwtTokenMiddleware = void 0;
const customError_1 = __importDefault(require("../../handlers/errors/customError"));
const token_manager_1 = require("../utils/token-manager");
const user_service_1 = require("../services/user.service");
//!This is the actual verification of the jwt
const verifyAccessJwtTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            throw new customError_1.default("No token received.", 400);
        }
        const [bearer, token] = bearerToken.split(" ");
        if (bearer !== "Bearer") {
            throw new customError_1.default("Invalid token type.", 400);
        }
        if (!token) {
            throw new customError_1.default("Invalid token.", 400);
        }
        const verifiedToken = (0, token_manager_1.jwtRefreshVerification)(token);
        if (!verifiedToken) {
            throw new customError_1.default("Invalid token.", 500);
        }
        const user = yield user_service_1.userService.getUserByEmail(verifiedToken.email);
        if (!user) {
            throw new customError_1.default("User not found.", 404);
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.verifyAccessJwtTokenMiddleware = verifyAccessJwtTokenMiddleware;
//# sourceMappingURL=jwt.middleware.js.map