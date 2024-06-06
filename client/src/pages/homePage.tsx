import HomeMainBox from "../components/home/homeMainBox";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import HomeMainCard from "../components/home/homeMainCard";
import bill from "../assets/bill.jfif";
import { getMusic } from "@/services/music/music.service";
import { useSelector } from "react-redux";
import {
  MusicTypes,
  MusicWithUserTypes,
  UserStateTypes,
} from "@/interfaces/types/index.interfaces";

const HomePage = () => {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const [hoveredArtist, setHoveredArtist] = useState<number | null>(null);
  const [artistLists, setArtistLists] = useState<UserStateTypes[]>([]);
  const [musicLists, setMusicLists] = useState<MusicWithUserTypes[]>([]);

  const { id } = useSelector((state) => state.user);

  let dataS: HomeMainArtistsProps[] = [
    {
      id: "1",
      image: bill,
      title: "Billie Eilish",
    },
    {
      id: "2",
      image: bill,
      title: "Billie Eilish",
    },
    {
      id: "3",
      image: bill,
      title: "Liked Songs",
    },
    {
      id: "4",
      image: bill,
      title: "Liked Songs",
    },
    {
      id: "5",
      image: bill,
      title: "Liked Songs",
    },
    {
      id: "6",
      image: bill,
      title: "Liked Songs",
    },
    {
      id: "7",
      image: bill,
      title: "Liked Songs",
    },
    {
      id: "8",
      image: bill,
      title: "Liked Songs",
    },
  ];

  let hehe =
    "  http://localhost:4000/uploads/music/b765a8add257c732318b8c53cd7381a0";
  // const playMusic = () => {
  //   new Audio(hehe).play();
  // };

  const audioList = [
    {
      name: "Song Name",
      singer: "Singer Name",
      cover: bill,
      musicSrc: hehe,
    },
    {
      name: "Song ",
      singer: "Singer ",
      cover: bill,
      musicSrc: hehe,
    },
  ];

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
    <div className="flex flex-col gap-4 w-full bg-primaryColor p-4   rounded-md overflow-hidden overflow-y-auto h-[670px]">
      <div className="flex gap-1 ">
        <div className="p-2 rounded-full bg-black text-white text-sm">
          <FaChevronLeft />
        </div>
        <div className="p-2 rounded-full bg-black text-white text-sm">
          <FaChevronRight />
        </div>
      </div>
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
