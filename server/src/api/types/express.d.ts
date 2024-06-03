import { Users } from "@prisma/client";
import { Request } from "express";

declare global {
  namespace Express {
    export interface Request {
      user: Users;
      // upload_urls: { [fieldname: string]: string };
    }
  }
}
