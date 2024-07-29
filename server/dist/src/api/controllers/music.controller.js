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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const music_service_1 = require("../services/music.service");
const successHandler_1 = require("../../handlers/success/successHandler");
const customError_1 = __importDefault(require("../../handlers/errors/customError"));
dotenv_1.default.config();
class MusicController {
    constructor() {
        this.addMusic = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const user = req.user;
                const files = req.files;
                const musicFile = (_a = files === null || files === void 0 ? void 0 : files.url) === null || _a === void 0 ? void 0 : _a[0];
                const imageFile = (_b = files === null || files === void 0 ? void 0 : files.image) === null || _b === void 0 ? void 0 : _b[0];
                let songDTO = req.body;
                const baseURL = process.env.BASE_URL;
                const music = musicFile ? `${baseURL}/${musicFile.path}` : null;
                const image = imageFile ? `${baseURL}/${imageFile.path}` : null;
                console.log(music);
                let songDetails = {
                    name: songDTO.name,
                    url: music,
                    image,
                    user,
                };
                const uploadMusic = yield music_service_1.musicService.addMusic(songDetails);
                if (uploadMusic) {
                    return (0, successHandler_1.successHandler)(res, 201, null, "New song added successfully.");
                }
                else {
                    throw new customError_1.default("Failure while addition of song.", 400);
                }
            }
            catch (e) {
                next(e);
            }
        });
        this.getAllHomeDetails = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                console.log(userId);
                let details;
                if (userId != undefined || userId == "") {
                    details = yield music_service_1.musicService.getHomeMusicWithUserId(userId);
                }
                else {
                    details = yield music_service_1.musicService.getHomeMusicWithoutUserId();
                }
                return (0, successHandler_1.successHandler)(res, 200, details, "These are the details for home.");
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.musicController = new MusicController();
//# sourceMappingURL=music.controller.js.map