"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAccessVerification = exports.jwtAccessCreation = exports.jwtRefreshVerification = exports.jwtRefreshCreation = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;
const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;
// Function to create a JWT
const jwtRefreshCreation = ({ name, id, email, picture, }) => {
    const token = jsonwebtoken_1.default.sign({ name, id, email, picture }, JWT_REFRESH_SECRET_KEY, {
        expiresIn: "10d",
        algorithm: "HS256", // Algorithm used to sign the token
    });
    return token;
};
exports.jwtRefreshCreation = jwtRefreshCreation;
// Function to verify a JWT access token
const jwtRefreshVerification = (token) => {
    return jsonwebtoken_1.default.verify(token, JWT_REFRESH_SECRET_KEY);
};
exports.jwtRefreshVerification = jwtRefreshVerification;
const jwtAccessCreation = ({ id, email }) => {
    const token = jsonwebtoken_1.default.sign({ id, email }, JWT_ACCESS_SECRET_KEY, {
        expiresIn: "2m",
        algorithm: "HS256", // Algorithm used to sign the token
    });
    return token;
};
exports.jwtAccessCreation = jwtAccessCreation;
const jwtAccessVerification = (token) => {
    return jsonwebtoken_1.default.verify(token, JWT_ACCESS_SECRET_KEY);
};
exports.jwtAccessVerification = jwtAccessVerification;
//# sourceMappingURL=token-manager.js.map