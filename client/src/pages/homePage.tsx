import HomeMainBox from "../components/home/homeMainBox";
import { useEffect, useState } from "react";
import HomeMainCard from "../components/home/homeMainCard";
import { getMusic } from "@/services/music/music.service";
import { useSelector } from "react-redux";
import {
  MusicWithUserTypes,
  UserStateTypes,
} from "@/interfaces/types/index.interfaces";

const HomePage = () => {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const [hoveredArtist, setHoveredArtist] = useState<number | null>(null);
  const [artistLists, setArtistLists] = useState<UserStateTypes[]>([]);
  const [musicLists, setMusicLists] = useState<MusicWithUserTypes[]>([]);

  const { id } = useSelector((state) => state.user);

  const getHomeMusicDetails = async () => {
    try {
      const res = await getMusic(id);
      console.log(res);
      let data = res.data.data;
      setMusicLists(data.songs);
      setArtistLists(data.users);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getHomeMusicDetails();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full bg-primaryColor p-4 pt-14 ">
      <p className="text-2xl font-semibold text-white">Good morning </p>
      <div className="grid grid-cols-3 gap-4">
        {artistLists.map((box, index) => (
          <HomeMainBox
            key={box.id}
            id={box.id}
            email={box.email}
            picture={box.picture}
            name={box.name}
            isHovered={hoveredBox === index}
            onMouseEnter={() => setHoveredBox(index)}
            onMouseLeave={() => setHoveredBox(null)}
          />
        ))}
      </div>
      <p>
        Slider with first is new songs or randoms songs and second will be
        recently played and third will be recently liked
      </p>
      <div className="grid grid-cols-6 gap-4">
        {musicLists.map((data, index) => (
          <HomeMainCard
            key={index}
            isHovered={hoveredArtist === index}
            onMouseEnter={() => setHoveredArtist(index)}
            onMouseLeave={() => setHoveredArtist(null)}
            name={data.name}
            image={data.image}
            url={data.url}
            userName={data.user.name}
          />
        ))}
      </div>
      {/* <button onClick={playMusic}>play music</button> */}
      {/* <ReactJkMusicPlayer mode="full" audioLists={audioList} /> */}
      {/* <MusicPlayer audioList={audioList} /> */}
    </div>
  );
};

export default HomePage;
