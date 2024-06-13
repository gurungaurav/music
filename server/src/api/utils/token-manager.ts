import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import jwt from "jsonwebtoken";
import { JWTPayloadTypes, JwtPayloadExtended } from "../types/index.interfaces";

const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;
const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;

// Function to create a JWT
export const jwtRefreshCreation = ({
  name,
  id,
  email,
  picture,
}: JWTPayloadTypes): string => {
  const token = jwt.sign({ name, id, email, picture }, JWT_REFRESH_SECRET_KEY, {
    expiresIn: "10d",
    algorithm: "HS256", // Algorithm used to sign the token
  });
  return token;
};

// Function to verify a JWT access token
export const jwtRefreshVerification = (token: string): JwtPayloadExtended => {
  return jwt.verify(token, JWT_REFRESH_SECRET_KEY) as JwtPayloadExtended;
};

export const jwtAccessCreation = ({ id, email }): string => {
  const token = jwt.sign({ id, email }, JWT_ACCESS_SECRET_KEY, {
    expiresIn: "2m",
    algorithm: "HS256", // Algorithm used to sign the token
  });
  return token;
};

export const jwtAccessVerification = (token: string) => {
  return jwt.verify(token, JWT_ACCESS_SECRET_KEY);
};
