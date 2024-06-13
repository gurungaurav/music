import { Request, Response, NextFunction } from "express-serve-static-core";
import { IUserDetailsWithMusic } from "../dtos/user.dto";
import { userService } from "../services/user.service";
import { successHandler } from "../../handlers/success/successHandler";
import CustomError from "../../handlers/errors/customError";
import { UserDetails } from "../types/index.interfaces";

class UserController {
  //For getting all users
  getUserDetails = async (
    req: Request<{}, {}, UserDetails>,
    res: Response<UserDetails[]>,
    next: NextFunction
  ) => {
    try {
      const userDetails = await userService.getUserDetails();

      return successHandler(res, 200, userDetails, "These are the all user's");
    } catch (e) {
      next(e);
    }
  };

  getSpecificUser = async (
    req: Request<{ user_id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.user_id;

      const user = await userService.getUserById(userId);

      if (user != null) {
        return successHandler(res, 200, user, "Specific user's details");
      } else {
        throw new CustomError("User not found", 400);
      }
    } catch (e) {
      next(e);
    }
  };

  getSpecificUserWithMusic = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;

      const user: IUserDetailsWithMusic =
        await userService.getUserByIdWithSongs(userId);

      if (user != null) {
        return successHandler(
          res,
          200,
          user,
          "Specific user's details with songs"
        );
      } else {
        throw new CustomError("User not found", 404);
      }
    } catch (e) {
      next(e);
    }
  };

  sideBarArtists = async (
    req: Request<{}, {}, {}, { queryName: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const name = req.query.queryName;
      const users = await userService.getSideArtists(name);

      return successHandler(res, 200, users, "Side artists");
    } catch (e) {
      next(e);
    }
  };
}

export const userController = new UserController();
