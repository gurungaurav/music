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
exports.userService = void 0;
const __1 = require("../../..");
const prismaSelectQueries_1 = require("../utils/prismaSelectQueries");
class UserService {
    constructor() {
        //For getting all users
        this.getUserDetails = () => __awaiter(this, void 0, void 0, function* () {
            const userDetails = yield __1.prisma.users.findMany({
                select: { id: true, name: true, email: true, picture: true },
            });
            return userDetails.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                picture: user.picture,
            }));
        });
        //For registration of the user
        this.registerUser = (userDTO) => __awaiter(this, void 0, void 0, function* () {
            const userDetails = yield __1.prisma.users.create({
                data: userDTO,
            });
            if (userDetails) {
                return true;
            }
            return false;
        });
        //Getting user by Id
        this.getUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield __1.prisma.users.findFirst({ where: { id: id } });
            if (user) {
                return user;
            }
            else {
                return null;
            }
        });
        //Getting user by email
        this.getUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield __1.prisma.users.findFirst({ where: { email: email } });
            if (user) {
                return user;
            }
            else {
                return null;
            }
        });
        //Getting user by Id WITh songs
        this.getUserByIdWithSongs = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield __1.prisma.users.findFirst({
                where: { id: id },
                select: prismaSelectQueries_1.userSelectFields,
            });
            if (user) {
                return user;
            }
            else {
                return null;
            }
        });
        this.getSideArtists = (queryName) => __awaiter(this, void 0, void 0, function* () {
            // Initialize the query object
            const query = {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    picture: true,
                },
            };
            // Add the where clause only if queryName is not empty or undefined
            if (queryName) {
                query.where = {
                    name: {
                        contains: queryName,
                        mode: "insensitive",
                    },
                };
            }
            // Execute the query
            const users = yield __1.prisma.users.findMany(query);
            return users;
        });
    }
}
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map