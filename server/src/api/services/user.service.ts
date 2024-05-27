import { prisma } from "../../..";
import { UserRegisterDTO } from "../dtos/user.dto";
import { UserDetails } from "../interfaces/types/user.interfaces";

class UserService {
  //For getting all users
  getUserDetails = async (): Promise<UserDetails[]> => {
    const userDetails = await prisma.users.findMany({
      select: { name: true, email: true, createdAt: true },
    });

    return userDetails.map((user) => ({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
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

  //Checking if the user already exists or not
  checkUserExistence = async (userDTO: UserRegisterDTO): Promise<boolean> => {
    const userExists = await prisma.users.findFirst({
      where: { email: userDTO.email },
    });

    if (userExists) {
      return true;
    } else {
      return false;
    }
  };

  getSpecficUser = async (user_id: string): Promise<UserDetails> => {
    const user: UserDetails = await prisma.users.findFirst({
      select: { name: true, email: true, createdAt: true },
      where: { id: user_id },
    });

    if (user != undefined) {
      return user;
    } else {
      return null;
    }
  };
}

export const userService = new UserService();
