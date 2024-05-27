import { Request, Response, NextFunction } from "express-serve-static-core";
import { UserRegisterDTO } from "../dtos/user.dto";
import { userService } from "../services/user.service";
import { successHandler } from "../../handlers/success/successHandler";
import CustomError from "../../handlers/errors/customError";
import { UserDetails } from "../interfaces/types/user.interfaces";

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

  //For registration of the user
  registerUser = async (
    req: Request<{}, {}, UserRegisterDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userDTO = req.body;

      const userAddition = await userService.registerUser(userDTO);

      if (userAddition) {
        return successHandler(res, 201, null, "User registered successfully.");
      } else {
        throw new CustomError("User registration failed", 400);
      }
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

      const user = await userService.getSpecficUser(userId);

      if (user != null) {
        return successHandler(res, 200, user, "Specific user's details");
      } else {
        throw new CustomError("User not found", 400);
      }
    } catch (e) {
      next(e);
    }
  };
}

export const userController = new UserController();
