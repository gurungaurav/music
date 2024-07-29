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
exports.musicService = void 0;
const __1 = require("../../..");
const prismaSelectQueries_1 = require("../utils/prismaSelectQueries");
class MusicService {
    constructor() {
        this.addMusic = (song) => __awaiter(this, void 0, void 0, function* () {
            console.log(song);
            const uploadMusic = yield __1.prisma.songs.create({
                data: {
                    name: song.name,
                    url: song.url,
                    image: song.image,
                    userId: song.user.id,
                },
            });
            if (uploadMusic) {
                return true;
            }
            else {
                return false;
            }
        });
        //!These with and without are taken so that if the user is currently logged in then the with id will be used cuz if the user has not been logged
        //! in then the user should be able to surf as well if this is used as the main function then when the user is not logged in then
        //! The id will be undefined and errors will occur so yeah tei user ko account suggest or na dekehuani vanera afu logged in garda tei ho
        this.getHomeMusicWithUserId = (id) => __awaiter(this, void 0, void 0, function* () {
            const getMusic = yield __1.prisma.songs.findMany({
                where: { id: { not: id } },
                select: prismaSelectQueries_1.songSelectFields,
            });
            const getArtists = yield __1.prisma.users.findMany({
                orderBy: { createdAt: "desc" },
                take: 6,
                where: { id: { not: id } },
                select: { id: true, name: true, email: true, picture: true },
            });
            const homeMusics = {
                users: getArtists,
                songs: getMusic,
            };
            return homeMusics;
        });
        //! When user is not logged in
        this.getHomeMusicWithoutUserId = () => __awaiter(this, void 0, void 0, function* () {
            const getMusic = yield __1.prisma.songs.findMany({
                select: prismaSelectQueries_1.songSelectFields,
            });
            const getArtists = yield __1.prisma.users.findMany({
                select: { id: true, name: true, email: true, picture: true },
            });
            const homeMusics = {
                users: getArtists,
                songs: getMusic,
            };
            return homeMusics;
        });
    }
}
exports.musicService = new MusicService();
//# sourceMappingURL=music.service.js.map