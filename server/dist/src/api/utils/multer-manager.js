"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMulterUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const customError_1 = __importDefault(require("../../handlers/errors/customError"));
const createMulterUpload = (uploadPath) => {
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    });
    return (0, multer_1.default)({
        storage: storage,
        limits: { fileSize: 100000000 }, //10MB size limit
        fileFilter: function (req, file, cb) {
            checkFileType(file, cb);
        },
    });
};
exports.createMulterUpload = createMulterUpload;
function checkFileType(file, cb) {
    // Define allowed MIME types
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "audio/mpeg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new customError_1.default("Only images (jpeg, jpg, png, gif) and music files (mp3) are allowed!", 400));
    }
}
//# sourceMappingURL=multer-manager.js.map