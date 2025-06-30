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
      className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 py-2 px-2 sm:px-4 hover:bg-hoverColor rounded-md duration-200 cursor-pointer mt-2 items-center text-xs sm:text-sm text-secondaryColor"
    >
      {/* Song info section - spans 2 cols on mobile, 2 cols on sm, 3 cols on lg+ */}
      <div className="flex col-span-2 sm:col-span-2 lg:col-span-3 items-center gap-2 sm:gap-3 lg:gap-5 min-w-0">
        <div className="w-[10px] flex-shrink-0">
          {isHovered ? (
            <FaPlay className="text-xs text-white" />
          ) : (
            <p className="text-xs sm:text-sm">{index + 1}</p>
          )}
        </div>
        <img
          src={imageUrl}
          className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded flex-shrink-0"
          alt="Song cover"
        />
        <p className="font-semibold text-white truncate text-xs sm:text-sm">
          {name}
        </p>
      </div>

      {/* Play count - hidden on mobile, visible on sm+ */}
      <div className="hidden sm:block lg:block">
        <p
          className={`${
            isHovered && "text-white"
          } font-semibold text-[10px] sm:text-[12px] tracking-wider truncate`}
        >
          2,212,291,101
        </p>
      </div>

      {/* Actions section */}
      <div className="flex gap-2 sm:gap-4 lg:gap-6 items-center justify-end">
        <FaHeart className="text-green-500 text-xs sm:text-sm flex-shrink-0" />
        <p className="text-xs sm:text-sm">3:37</p>
        {isHovered && (
          <PiDotsThreeBold className="text-lg sm:text-xl lg:text-2xl hover:scale-105 duration-300 cursor-pointer hover:text-white text-secondaryColor flex-shrink-0" />
        )}
      </div>
    </div>
  );
};

export default MainMusicCard;
