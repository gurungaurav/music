"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// errors/CustomError.ts
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.default = CustomError;
//# sourceMappingURL=customError.js.map