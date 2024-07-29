"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("./user.routes");
const music_routes_1 = require("./music.routes");
const auth_routes_1 = require("./auth.routes");
const indexRoutes = (0, express_1.Router)();
indexRoutes.use("/user", user_routes_1.userRoutes);
indexRoutes.use("/music", music_routes_1.musicRoutes);
indexRoutes.use("/auth", auth_routes_1.authRoutes);
exports.default = indexRoutes;
//# sourceMappingURL=index.routes.js.map