import { JwtPayload } from "jsonwebtoken";

export interface UserDetails {
  name: string;
  email: string;
  picture: string;
}

export interface JWTPayloadTypes {
  name: string;
  id: string;
  email: string;
  picture: string;
}

export interface JwtPayloadExtended extends JwtPayload {
  name: string;
  id: string;
  email: string;
  picture: string;
}
