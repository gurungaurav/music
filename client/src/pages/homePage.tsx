import HomeMainBox from "../components/home/homeMainBox";
import { useState } from "react";
import HomeMainCard from "../components/home/homeMainCard";
import useHomeDetailsHook from "@/hooks/useHomeDetailsHook";

const HomePage = () => {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const [hoveredArtist, setHoveredArtist] = useState<number | null>(null);

  const { artistLists, musicLists } = useHomeDetailsHook();

  return (
    <div className="flex flex-col gap-4 w-full bg-primaryColor p-4 pt-14 ">
      <p className="text-2xl font-semibold text-white">
        Good night bruhhh lol broski{" "}
      </p>
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
