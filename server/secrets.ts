import dotenv from "dotenv";

// dotenv.config({ path: ".env" });

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const SERVER_PORT = process.env.PORT as string;
export const DATABASE_URL = process.env.DATABASE_URL as string;
