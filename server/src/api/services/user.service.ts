import { Users } from "@prisma/client";
import { prisma } from "../../..";
import { IUserDetailsWithMusic, UserRegisterDTO } from "../dtos/user.dto";
import { UserDetails } from "../types/index.interfaces";
import { userSelectFields } from "../utils/prismaSelectQueries";

class UserService {
  //For getting all users
  getUserDetails = async (): Promise<UserDetails[]> => {
    const userDetails = await prisma.users.findMany({
      select: { id: true, name: true, email: true, picture: true },
    });

    return userDetails.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture,
    }));
  };

  //For registration of the user
  registerUser = async (userDTO: UserRegisterDTO): Promise<boolean> => {
    const userDetails = await prisma.users.create({
      data: userDTO,
    });

    if (userDetails) {
      return true;
    }

    return false;
  };

  //Getting user by Id
  getUserById = async (id: string): Promise<Users> => {
    const user = await prisma.users.findFirst({ where: { id: id } });

    if (user) {
      return user;
    } else {
      return null;
    }
  };

  //Getting user by email
  getUserByEmail = async (email: string): Promise<Users> => {
    const user = await prisma.users.findFirst({ where: { email: email } });

    if (user) {
      return user;
    } else {
      return null;
    }
  };

  //Getting user by Id WITh songs
  getUserByIdWithSongs = async (id: string): Promise<IUserDetailsWithMusic> => {
    const user = await prisma.users.findFirst({
      where: { id: id },
      select: userSelectFields,
    });

    if (user) {
      return user;
    } else {
      return null;
    }
  };

  getSideArtists = async (queryName: string): Promise<UserDetails[]> => {
    // Initialize the query object
    const query: any = {
      select: {
        id: true,
        name: true,
        email: true,
        picture: true,
      },
    };

    // Add the where clause only if queryName is not empty or undefined
    if (queryName) {
      query.where = {
        name: {
          contains: queryName,
          mode: "insensitive",
        },
      };
    }

    // Execute the query
    const users = await prisma.users.findMany(query);
    return users;
  };
}

export const userService = new UserService();
