import { prisma } from "../../..";
import { MusicWithUserTypes } from "../dtos/music.dto";

class MusicService {
  addMusic = async (song: MusicWithUserTypes): Promise<boolean> => {
    console.log(song);

    const uploadMusic = await prisma.songs.create({
      data: {
        name: song.title,
        url: song.music,
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
}

export const musicService = new MusicService();
