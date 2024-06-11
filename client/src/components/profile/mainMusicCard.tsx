import { HomeMainSongsWithHoverProps } from "@/interfaces/types/components/component.interfaces";
import React from "react";
import { FaHeart, FaPlay } from "react-icons/fa";
import { PiDotsThreeBold } from "react-icons/pi";

const MainMusicCard: React.FC<
  HomeMainSongsWithHoverProps & { index: number }
> = ({ image, isHovered, onMouseEnter, url, name, onMouseLeave, index }) => {
  console.log(url);

  const imageUrl =
    typeof image === "string"
      ? image
      : image instanceof File
      ? URL.createObjectURL(image)
      : "";
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="grid grid-cols-5 py-2 px-4 hover:bg-hoverColor rounded-md duration-200 cursor-pointer mt-2 items-center text-sm text-secondaryColor"
    >
      <div className="flex col-span-3 items-center gap-5">
        <div className="w-[10px]">
          {isHovered ? (
            <FaPlay className="text-xs text-white" />
          ) : (
            <p>{index + 1}</p>
          )}
        </div>
        <img
          src={imageUrl}
          className="w-10 h-10 object-cover "
          alt="hshs"
        ></img>
        <p className="font-semibold text-white">{name}</p>
      </div>
      <div>
        <p
          className={`${
            isHovered && "text-white"
          } font-semibold text-[12px] tracking-wider`}
        >
          2,212,291,101
        </p>
      </div>
      <div className="flex gap-6 items-center">
        <FaHeart className="text-green-500" />
        <p>3:37</p>
        {isHovered && (
          <PiDotsThreeBold className="text-2xl hover:scale-105 duration-300 cursor-pointer hover:text-white text-secondaryColor  " />
        )}
      </div>
    </div>
  );
};

export default MainMusicCard;
