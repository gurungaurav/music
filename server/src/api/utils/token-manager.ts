import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import jwt from "jsonwebtoken";
import { JWTPayloadTypes, JwtPayloadExtended } from "../types/user.interfaces";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Function to create a JWT
export const jwtCreation = ({
  name,
  id,
  email,
  picture,
}: JWTPayloadTypes): string => {
  const token = jwt.sign({ name, id, email, picture }, JWT_SECRET, {
    expiresIn: "10d",
    algorithm: "HS256", // Algorithm used to sign the token
  });
  return token;
};

// Function to verify a JWT
export const jwtVerification = (token: string): JwtPayloadExtended => {
  return jwt.verify(token, JWT_SECRET) as JwtPayloadExtended;
};
