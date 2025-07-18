import { UserDetails } from "../types/index.interfaces";
import { MusicTypes } from "./music.dto";

//This is made for getting the details like requesting from the client/http
export interface UserRegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface IUserDetailsWithMusic extends UserDetails {
  songs: MusicTypes[];
}
