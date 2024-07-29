"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = __importDefault(require("./src/api/routes/index.routes"));
const errorHandler_1 = require("./src/handlers/errors/errorHandler");
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const frontendUrl = process.env.FRONTEND_BASE_URL;
// Use helmet for security headers
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
// Configure CORS to allow requests from the frontend URL
app.use((0, cors_1.default)({
    origin: frontendUrl,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Middleware to set CORS headers for static files
app.use("/uploads/music", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", frontendUrl);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Cross-Origin-Resource-Policy", "cross-origin"); // Add this header
    next();
}, express_1.default.static("uploads/music"));
app.use(express_1.default.json());
exports.prisma = new client_1.PrismaClient();
app.use("/api/v1", index_routes_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map