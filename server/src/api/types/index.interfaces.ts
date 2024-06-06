import { JwtPayload } from "jsonwebtoken";
import { MusicTypes } from "../dtos/music.dto";

export interface UserDetails {
  id: string;
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

export interface HomeMusicTypes {
  users: UserDetails[];
  songs: MusicTypes[];
}
