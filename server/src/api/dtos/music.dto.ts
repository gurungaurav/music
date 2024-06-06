import { Users } from "@prisma/client";

export interface MusicTypes {
  name: string;
  image: string;
  url: string;
}

export interface MusicWithUserTypes extends MusicTypes {
  user: Users;
}
