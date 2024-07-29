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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const yup_1 = require("yup");
class UserValidation {
    constructor() {
        this.userRegisterValidation = (schema) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield schema.validate(req.body, { abortEarly: false });
                next();
            }
            catch (error) {
                if (error instanceof yup_1.ValidationError) {
                    res.status(400).json({
                        success: false,
                        message: "Validation errors",
                        errors: error.inner.map((err) => ({
                            field: err.path,
                            message: err.message,
                        })),
                    });
                }
                else {
                    next(error);
                }
            }
        });
        this.userLoginValidation = (schema) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield schema.validate(req.body, { abortEarly: false });
                next();
            }
            catch (error) {
                if (error instanceof yup_1.ValidationError) {
                    res.status(400).json({
                        success: false,
                        message: "Validation errors",
                        errors: error.inner.map((err) => ({
                            field: err.path,
                            message: err.message,
                        })),
                    });
                }
                else {
                    next(error);
                }
            }
        });
    }
}
exports.userValidation = new UserValidation();
//# sourceMappingURL=user.validaton.js.map