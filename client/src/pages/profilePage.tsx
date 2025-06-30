import wall from "@/assets/red-image.jpg";
import { MdVerified } from "react-icons/md";
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

  const songs: AudioTrackTypes[] = (artistDetails?.songs ?? []).map((song) => {
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
    <div className="w-full min-h-screen bg-primaryColor text-white">
      {/* Hero Section with Background Image */}
      <div
        className="relative w-full h-[50vh]   bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${wall})`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Artist Details */}
        <div className="relative z-10 h-full flex flex-col justify-end p-2 ">
          <div className="max-w-7xl mx-auto w-full">
            <span className="flex gap-1 items-center mb-2 ">
              <MdVerified className="text-blue-500 text-lg sm:text-xl md:text-2xl" />
              <p className="text-xs sm:text-sm font-semibold">
                Verified Artist
              </p>
            </span>
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl  mb-2 sm:mb-4 leading-tight drop-shadow-lg">
              {artistDetails?.name}
            </h1>
            {/* <p className="text-sm sm:text-base font-semibold drop-shadow-md">
              94,372,881 monthly listeners
            </p> */}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-2  py-6 sm:py-8">
        {/* Action Buttons */}
        {/* <div className="flex items-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          <div
            className={`p-3 sm:p-4 text-xl sm:text-2xl w-fit ${"bg-green-500 text-black"} hover:scale-105 duration-300 cursor-pointer rounded-full shadow-lg`}
          >
            <TbPlayerPlayFilled />
          </div>
          <div className="px-4 sm:px-6 rounded-full flex py-2 sm:py-3 cursor-pointer hover:border-white border-secondaryColor hover:scale-105 duration-300 text-center items-center border text-xs sm:text-sm font-semibold transition-all">
            <p>Following</p>
          </div>
          <PiDotsThreeBold className="text-2xl sm:text-3xl hover:scale-105 duration-300 cursor-pointer hover:text-white text-secondaryColor" />
        </div> */}

        {/* Songs Section */}
        <div>
          <h2 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-6">
            Popular
          </h2>
          <div className="flex flex-col space-y-1">
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
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
