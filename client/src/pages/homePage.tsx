import HomeMainBox from "../components/home/homeMainBox";
import liked from "../assets/sajjan.jfif";
import bill from "../assets/bill.jfif";
import { HomeMainArtistsProps } from "../interfaces/types/components/component.interfaces";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import HomeMainCard from "../components/home/homeMainCard";
import { getCookies } from "@/utils/cookies-handler";

const HomePage = () => {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const [hoveredArtist, setHoveredArtist] = useState<number | null>(null);
  const [getToken, setToken] = useState<string | null>(null);

  let data: HomeMainArtistsProps[] = [
    {
      id: "1",
      image: liked,
      title: "Liked Songs",
    },
    {
      id: "2",
      image: liked,
      title: "Liked Songs",
    },
    {
      id: "3",
      image: liked,
      title: "Liked Songs",
    },
    {
      id: "4",
      image: liked,
      title: "Liked Songs",
    },
    {
      id: "5",
      image: liked,
      title: "Liked Songs",
    },
    {
      id: "6",
      image: liked,
      title: "Liked Songs",
    },
  ];

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

  useEffect(() => {
    const eheh = getCookies();
    console.log(eheh);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full bg-primaryColor p-4   rounded-md overflow-hidden overflow-y-auto h-[680px]">
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
        {data.map((box, index) => (
          <HomeMainBox
            key={box.id}
            id={box.id}
            image={box.image}
            title={box.title}
            isHovered={hoveredBox === index}
            onMouseEnter={() => setHoveredBox(index)}
            onMouseLeave={() => setHoveredBox(null)}
          />
        ))}
      </div>
      <div className="grid grid-cols-6 gap-4">
        {dataS.map((data, index) => (
          <HomeMainCard
            key={data.id}
            id={data.id}
            isHovered={hoveredArtist === index}
            onMouseEnter={() => setHoveredArtist(index)}
            onMouseLeave={() => setHoveredArtist(null)}
            image={data.image}
            title={data.title}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
