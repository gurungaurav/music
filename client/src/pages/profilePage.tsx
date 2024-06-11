import { TbPlayerPlayFilled } from "react-icons/tb";
import wall from "../assets/bigWall.jpg";
import { MdVerified } from "react-icons/md";
import { PiDotsThreeBold } from "react-icons/pi";
import { useState } from "react";
import MainMusicCard from "@/components/profile/mainMusicCard";
import useProfileDetailsHook from "@/hooks/useProfileDetailsHook";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setAudioList,
  setCurrentTrack,
  setPlaying,
} from "@/redux/slice/musicPlayerSlice";
import { AudioTrackTypes } from "@/interfaces/types/index.interfaces";

export default function ProfilePage() {
  const [hoveredSong, setHoveredSong] = useState<number | null>(null);
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { artistDetails, errorRes } = useProfileDetailsHook(id ?? "defaultId");

  let songs: AudioTrackTypes[] = (artistDetails?.songs ?? []).map((song) => {
    return {
      name: song.name,
      singer: artistDetails?.name ?? "",
      cover: song.image,
      musicSrc: song.url,
    };
  });

  const playMusic = (musicSrc: number) => {
    dispatch(setAudioList(songs));
    dispatch(setCurrentTrack(musicSrc));
    dispatch(setPlaying(true));
  };
  if (errorRes || artistDetails == undefined) {
    navigate(-1);
  }

  console.log(artistDetails);

  return (
    <div
      className=" w-full h-full  bg-bottom bg-no-repeat bg-cover z-10  text-white"
      style={{ backgroundImage: `url(${wall})`, backgroundAttachment: "fixed" }}
    >
      <div className="mt-44 px-4">
        <span className="flex gap-1  items-center">
          <MdVerified className="text-blue-500 text-2xl" />
          <p className=" text-sm font-semibold">Verified Artist</p>
        </span>
        <h4 className=" font-bold text-7xl mt-1 mb-4">{artistDetails?.name}</h4>
        <p className="text-sm font-semibold ">94,372,881 monthly listeners</p>
      </div>
      <div
        // className="bg-gradient-to-b from-blue-950 via-primaryColor/100 to-primaryColor p-4 mt-6"
        className="bg-primaryColor p-4 mt-6 h-full"
      >
        <div className="flex items-center  gap-8 ">
          <div
            className={`p-3 text-xl  w-fit ${"bg-green-500 text-black"} hover:scale-105 duration-300 cursor-pointer rounded-full`}
          >
            <TbPlayerPlayFilled />
          </div>
          <div className="px-4 rounded-3xl flex py-1 cursor-pointer hover:border-white border-secondaryColor hover:scale-105 duration-300 text-center items-center border text-[12px] font-semibold">
            <p>Following</p>
          </div>
          <PiDotsThreeBold className="text-3xl hover:scale-105 duration-300 cursor-pointer hover:text-white text-secondaryColor  " />
        </div>
        <div>
          <p className="font-semibold text-lg mt-6">Songs by Billie eilish</p>
          <div className="flex flex-col ">
            {artistDetails?.songs?.map((data, index) => (
              <span key={index} role="button" onClick={() => playMusic(index)}>
                <MainMusicCard
                  index={index}
                  isHovered={hoveredSong === index}
                  onMouseEnter={() => setHoveredSong(index)}
                  onMouseLeave={() => setHoveredSong(null)}
                  name={data.name}
                  image={data.image}
                  url={data.url}
                  // userName={data.user.name}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
