import { TbPlayerPlayFilled } from "react-icons/tb";
import wall from "../assets/bigWall.jpg";
import { MdVerified } from "react-icons/md";
import { PiDotsThreeBold } from "react-icons/pi";
import bill from "../assets/bill.jfif";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export default function ProfilePage() {
  const [hoveredSong, setHoveredSong] = useState<number | null>(null);

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
        <h4 className=" font-bold text-7xl mt-1 mb-4">Billie Eilish</h4>
        <p className="text-sm font-semibold ">94,372,881 monthly listeners</p>
      </div>
      <div className="bg-gradient-to-b from-blue-950 via-primaryColor/100 to-primaryColor p-4 mt-6">
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ins, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredSong(index)}
                onMouseLeave={() => setHoveredSong(null)}
                className="grid grid-cols-5 py-2 px-4 hover:bg-hoverColor rounded-md duration-200 cursor-pointer mt-2 items-center text-sm text-secondaryColor"
              >
                <div className="flex col-span-3 items-center gap-5">
                  <div className="w-[10px]">
                    {hoveredSong !== index ? (
                      <p>{index + 1}</p>
                    ) : (
                      <FaPlay className="text-xs text-white" />
                    )}
                  </div>
                  <img src={bill} className="w-10 h-10 "></img>
                  <p className="font-semibold text-white">image</p>
                </div>
                <div>
                  <p
                    className={`${
                      hoveredSong === index && "text-white"
                    } font-semibold text-[12px] tracking-wider`}
                  >
                    2,212,291,101
                  </p>
                </div>
                <div className="flex gap-6 items-center">
                  <FaHeart className="text-green-500" />
                  <p>3:37</p>
                  {hoveredSong === index && (
                    <PiDotsThreeBold className="text-2xl hover:scale-105 duration-300 cursor-pointer hover:text-white text-secondaryColor  " />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
