import { Request, Response, NextFunction } from "express-serve-static-core";
import {
  IUserDetailsWithMusic,
  UserLoginDTO,
  UserRegisterDTO,
} from "../dtos/user.dto";
import { userService } from "../services/user.service";
import { successHandler } from "../../handlers/success/successHandler";
import CustomError from "../../handlers/errors/customError";
import { JWTPayloadTypes, UserDetails } from "../types/index.interfaces";
import { checkPassword, hashPassword } from "../utils/bcryptPass";
import { jwtCreation } from "../utils/token-manager";

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

      const hashedPass = await hashPassword(userDTO.password);

      const hashedUser = { ...userDTO, password: hashedPass };

      const userAddition = await userService.registerUser(hashedUser);

      if (userAddition) {
        return successHandler(res, 201, null, "User registered successfully.");
      } else {
        throw new CustomError("User registration failed", 400);
      }
    } catch (e) {
      next(e);
    }
  };

  loginUser = async (
    req: Request<{}, {}, UserLoginDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const injectDTO = req.user;
      const userDTO = req.body;
      const passCheck = await checkPassword(
        userDTO.password,
        injectDTO.password
      );

      if (!passCheck) {
        throw new CustomError("Password did'not matched", 400);
      }

      const jwtPayload: JWTPayloadTypes = {
        name: injectDTO.name,
        id: injectDTO.id,
        email: injectDTO.email,
        picture: injectDTO.picture,
      };

      const jwt = jwtCreation(jwtPayload);

      const userDetails: UserDetails = {
        id: injectDTO.id,
        name: injectDTO.name,
        email: injectDTO.email,
        picture: injectDTO.picture,
      };

      res.cookie("token", jwt, {
        httpOnly: false, // Must be false to access in JS
        secure: false, // For local development. Set to true in production with HTTPS
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, //For a day 24 hrs
      });

      successHandler(res, 201, userDetails, "User logged in successfully!");
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
