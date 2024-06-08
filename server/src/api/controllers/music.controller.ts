import { NextFunction, Request, Response } from "express-serve-static-core";
import dotenv from "dotenv";
import { musicService } from "../services/music.service";
import { successHandler } from "../../handlers/success/successHandler";
import CustomError from "../../handlers/errors/customError";
import { MusicTypes, MusicWithUserTypes } from "../dtos/music.dto";
import { HomeMusicTypes } from "../types/index.interfaces";

dotenv.config();

class MusicController {
  addMusic = async (
    req: Request<{}, {}, MusicTypes>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const musicFile = files?.url?.[0];
      const imageFile = files?.image?.[0];

      let songDTO = req.body;

      const baseURL = process.env.BASE_URL;
      const music = musicFile ? `${baseURL}/${musicFile.path}` : null;
      const image = imageFile ? `${baseURL}/${imageFile.path}` : null;
      console.log(music);

      let songDetails: MusicWithUserTypes = {
        name: songDTO.name,
        url: music,
        image,
        user,
      };

      const uploadMusic = await musicService.addMusic(songDetails);

      if (uploadMusic) {
        return successHandler(res, 201, null, "New song added successfully.");
      } else {
        throw new CustomError("Failure while addition of song.", 400);
      }
    } catch (e) {
      next(e);
    }
  };

  getAllHomeDetails = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;
      console.log(userId);

      let details: HomeMusicTypes;

      if (userId != undefined || userId == "") {
        details = await musicService.getHomeMusicWithUserId(userId);
      } else {
        details = await musicService.getHomeMusicWithoutUserId();
      }

      return successHandler(
        res,
        200,
        details,
        "These are the details for home."
      );
    } catch (e) {
      next(e);
    }
  };
}

export const musicController = new MusicController();
