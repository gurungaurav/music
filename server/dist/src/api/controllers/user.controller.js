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
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const successHandler_1 = require("../../handlers/success/successHandler");
const customError_1 = __importDefault(require("../../handlers/errors/customError"));
class UserController {
    constructor() {
        //For getting all users
        this.getUserDetails = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = yield user_service_1.userService.getUserDetails();
                return (0, successHandler_1.successHandler)(res, 200, userDetails, "These are the all user's");
            }
            catch (e) {
                next(e);
            }
        });
        this.getSpecificUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.user_id;
                const user = yield user_service_1.userService.getUserById(userId);
                if (user != null) {
                    return (0, successHandler_1.successHandler)(res, 200, user, "Specific user's details");
                }
                else {
                    throw new customError_1.default("User not found", 400);
                }
            }
            catch (e) {
                next(e);
            }
        });
        this.getSpecificUserWithMusic = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const user = yield user_service_1.userService.getUserByIdWithSongs(userId);
                if (user != null) {
                    return (0, successHandler_1.successHandler)(res, 200, user, "Specific user's details with songs");
                }
                else {
                    throw new customError_1.default("User not found", 404);
                }
            }
            catch (e) {
                next(e);
            }
        });
        this.sideBarArtists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.query.queryName;
                const users = yield user_service_1.userService.getSideArtists(name);
                return (0, successHandler_1.successHandler)(res, 200, users, "Side artists");
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.userController = new UserController();
//# sourceMappingURL=user.controller.js.map