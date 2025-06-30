import HomeMainBox from "../components/home/homeMainBox";
import { useState } from "react";
import HomeMainCard from "../components/home/homeMainCard";
import useHomeDetailsHook from "@/hooks/useHomeDetailsHook";

const HomePage = () => {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const [hoveredArtist, setHoveredArtist] = useState<number | null>(null);

  const { artistLists, musicLists } = useHomeDetailsHook();

  // // Function to randomize and get 4 items from the list
  // const getRandomizedMusicList = (musicLists) => {
  //   const shuffled = [...musicLists].sort(() => Math.random() - 0.5);
  //   return shuffled.slice(0, 4); // Return the first 4 items
  // };

  // const recentlyPlayedList = getRandomizedMusicList(musicLists);

  return (
    <div className="flex flex-col gap-4 w-full bg-primaryColor p-2 sm:p-4 pt-12 sm:pt-14">
      <span></span>
      {/* <p className="text-2xl font-semibold text-white">Good night</p> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
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
      <div className="space-y-4">
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mt-4">
          Your favourite
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
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
      </div>

      <div className="space-y-4">
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mt-4">
          Most Listened
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
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
      </div>

      {/* <p className="text-2xl font-semibold text-white mt-4">Recently played</p>
      <div className="grid grid-cols-6 gap-4">
        {recentlyPlayedList.map((data, index) => (
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
      </div> */}
      {/* <button onClick={playMusic}>play music</button> */}
      {/* <ReactJkMusicPlayer mode="full" audioLists={audioList} /> */}
      {/* <MusicPlayer audioList={audioList} /> */}
    </div>
  );
};

export default HomePage;
