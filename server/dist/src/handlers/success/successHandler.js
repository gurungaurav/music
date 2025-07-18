"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successHandler = void 0;
const successHandler = (res, status = 200, data = {}, message = "Success") => {
    return res.status(status).json({
        success: true,
        message,
        data,
    });
};
exports.successHandler = successHandler;
//# sourceMappingURL=successHandler.js.map