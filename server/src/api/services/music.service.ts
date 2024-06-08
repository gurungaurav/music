import { prisma } from "../../..";
import { MusicWithUserTypes } from "../dtos/music.dto";
import { HomeMusicTypes } from "../types/index.interfaces";

class MusicService {
  addMusic = async (song: MusicWithUserTypes): Promise<boolean> => {
    console.log(song);

    const uploadMusic = await prisma.songs.create({
      data: {
        name: song.name,
        url: song.url,
        image: song.image,
        userId: song.user.id,
      },
    });

    if (uploadMusic) {
      return true;
    } else {
      return false;
    }
  };

  //!These with and without are taken so that if the user is currently logged in then the with id will be used cuz if the user has not been logged
  //! in then the user should be able to surf as well if this is used as the main function then when the user is not logged in then
  //! The id will be undefined and errors will occur so yeah tei user ko account suggest or na dekehuani vanera afu logged in garda tei ho
  getHomeMusicWithUserId = async (id: string): Promise<HomeMusicTypes> => {
    const getMusic = await prisma.songs.findMany({
      where: { id: { not: id } },
      select: {
        name: true,
        image: true,
        url: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            picture: true,
          },
        },
      },
    });

    const getArtists = await prisma.users.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      where: { id: { not: id } },
      select: { id: true, name: true, email: true, picture: true },
    });

    const homeMusics: HomeMusicTypes = {
      users: getArtists,
      songs: getMusic,
    };

    return homeMusics;
  };

  //! When user is not logged in
  getHomeMusicWithoutUserId = async (): Promise<HomeMusicTypes> => {
    const getMusic = await prisma.songs.findMany({
      select: {
        name: true,
        image: true,
        url: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            picture: true,
          },
        },
      },
    });

    const getArtists = await prisma.users.findMany({
      select: { id: true, name: true, email: true, picture: true },
    });

    const homeMusics: HomeMusicTypes = {
      users: getArtists,
      songs: getMusic,
    };

    return homeMusics;
  };
}

export const musicService = new MusicService();
