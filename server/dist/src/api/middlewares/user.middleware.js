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
exports.checkUserLogin = exports.checkUserExistence = void 0;
const user_service_1 = require("../services/user.service");
const customError_1 = __importDefault(require("../../handlers/errors/customError"));
const checkUserExistence = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDTO = req.body;
        const userExists = yield user_service_1.userService.getUserByEmail(userDTO.email);
        if (userExists) {
            throw new customError_1.default("User has been already registered with this email", 400);
        }
        req.user = userExists;
        next();
    }
    catch (e) {
        next(e);
    }
});
exports.checkUserExistence = checkUserExistence;
const checkUserLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDTO = req.body;
        const user = yield user_service_1.userService.getUserByEmail(userDTO.email);
        if (!user) {
            throw new customError_1.default("User has not been registered yet!", 400);
        }
        //Injecting the values for reusing
        req.user = user;
        next();
    }
    catch (e) {
        next(e);
    }
});
exports.checkUserLogin = checkUserLogin;
//# sourceMappingURL=user.middleware.js.map