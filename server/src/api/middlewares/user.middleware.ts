import { Request, Response, NextFunction } from "express-serve-static-core";
import { UserRegisterDTO } from "../dtos/user.dto";
import { userService } from "../services/user.service";
import CustomError from "../../handlers/errors/customError";

export const checkUserExistence = async (
  req: Request<{}, {}, UserRegisterDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDTO = req.body;
    const userExists = await userService.checkUserExistence(userDTO);

    if (userExists) {
      throw new CustomError(
        "User has been already registered with this email",
        401
      );
    }

    // req.userDTO = userDTO;
    next();
  } catch (e) {
    next(e);
  }
};
