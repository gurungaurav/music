"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSelectFields = exports.songSelectFields = void 0;
exports.songSelectFields = {
    name: true,
    image: true,
    url: true,
    user: {
        select: {
            id: true,
            name: true,
            email: true,
            picture: true,
        },
    },
};
exports.userSelectFields = {
    id: true,
    name: true,
    email: true,
    picture: true,
    songs: {
        select: {
            name: true,
            image: true,
            url: true,
        },
    },
};
//# sourceMappingURL=prismaSelectQueries.js.map