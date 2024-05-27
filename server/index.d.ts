import { UserRegisterDTO } from "./src/api/dtos/user.dto";
import * as express from "express-serve-static-core";

//TODO: Need to do this and fix the custom request
declare global {
  namespace Express {
    export interface Request {
      hehe?: string;
      userDTO?: UserRegisterDTO;
    }
  }
}
