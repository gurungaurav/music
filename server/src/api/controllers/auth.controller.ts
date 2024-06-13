import { Request, Response, NextFunction } from "express-serve-static-core";
import { UserLoginDTO, UserRegisterDTO } from "../dtos/user.dto";
import { checkPassword, hashPassword } from "../utils/bcryptPass";
import { userService } from "../services/user.service";
import { successHandler } from "../../handlers/success/successHandler";
import CustomError from "../../handlers/errors/customError";
import { JWTPayloadTypes, UserDetails } from "../types/index.interfaces";
import {
  jwtAccessCreation,
  jwtRefreshCreation,
  jwtRefreshVerification,
} from "../utils/token-manager";

//!Class for controlling authentication and authorization like login, regi,logout, refresh tokens, etc.
class AuthController {
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

      const jwt = jwtRefreshCreation(jwtPayload);
      const accessToken = jwtAccessCreation(jwtPayload);

      const userDetails: UserDetails & { token: string } = {
        id: injectDTO.id,
        name: injectDTO.name,
        email: injectDTO.email,
        picture: injectDTO.picture,
        token: accessToken,
      };

      res.cookie("token", jwt, {
        httpOnly: true, // Must be false to access in JS
        secure: true, // For local development. Set to true in production with HTTPS
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, //For a day 24 hrs
      });

      successHandler(res, 201, userDetails, "User logged in successfully!");
    } catch (e) {
      next(e);
    }
  };

  //!This is for generating access token
  generateAccessToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const refreshToken = req.cookies.token;
      if (!refreshToken) {
        throw new CustomError("No refresh token received", 401);
      }

      const verifiedToken = jwtRefreshVerification(refreshToken);

      if (!verifiedToken) {
        throw new CustomError("Unauthorized", 500);
      }

      const user = await userService.getUserByEmail(verifiedToken.email);

      if (!user) {
        throw new CustomError("User not found", 404);
      }

      const jwtPayload = {
        id: user.id,
        email: user.email,
      };

      const accessToken = jwtAccessCreation(jwtPayload);

      return successHandler(res, 201, accessToken, "Access token received");
    } catch (e) {
      next(e);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookies = req.cookies;
      if (!cookies?.token) throw new CustomError("No token recieved", 204); //No content
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
      return successHandler(res, 200, null, "Cookie cleared logged out");
    } catch (e) {
      next(e);
    }
  };
}

export const authController = new AuthController();
