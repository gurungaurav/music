"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customError_1 = __importDefault(require("./customError"));
const errorHandler = (error, req, res, next) => {
    const errorMessage = (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong";
    const status = error instanceof customError_1.default ? error.status : 500;
    return res.status(status).json({
        success: false,
        message: errorMessage,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map