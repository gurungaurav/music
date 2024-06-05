import { Users } from "@prisma/client";

export interface MusicTypes {
  title: string;
  image: string;
  music: string;
}

export interface MusicWithUserTypes extends MusicTypes {
  user: Users;
}
