import * as yup from "yup"; // Import all of yup
import { UserRegisterDTO } from "../dtos/user.dto";

export const userRegisterSchema: yup.ObjectSchema<UserRegisterDTO> = yup.object(
  {
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    phoneNumber: yup.string().length(10).required(),
  }
);
