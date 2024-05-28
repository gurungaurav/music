import { RegisterUserTypes } from "../../interfaces/types/auth/logiRegi.interfaces";
import { url } from "../index.service";

export const RegisterUser = (form: RegisterUserTypes) => {
  return url.post("/user/registerUser", form);
};
