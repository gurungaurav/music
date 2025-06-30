import React from "react";
import { HomeMainSongsWithHoverProps } from "../../interfaces/types/components/component.interfaces";
import { TbPlayerPlayFilled } from "react-icons/tb";

const HomeMainCard: React.FC<
  HomeMainSongsWithHoverProps & { userName: string }
> = ({ image, url, userName, name, isHovered, onMouseEnter, onMouseLeave }) => {
  console.log(url);

  const imageUrl =
    typeof image === "string"
      ? image
      : image instanceof File
      ? URL.createObjectURL(image)
      : "";

  return (
    <div
      className="flex flex-col px-2 sm:px-4 pt-2 sm:pt-4 pb-4 sm:pb-8 gap-2 rounded-md bg-neutral-900 hover:bg-hoverColor duration-300 cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex relative items-center justify-center shadow-lg rounded-full">
        <img
          src={imageUrl}
          className="w-[80px] h-[80px] xs:w-[100px] xs:h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[157px] lg:h-[157px] rounded-full object-cover"
          alt="Music cover"
        />
        {isHovered && (
          <div
            className={`p-2 sm:p-3 text-lg sm:text-xl absolute bottom-1 -right-1 sm:bottom-2 sm:-right-2 ${"bg-green-500 text-black"} rounded-full`}
          >
            <TbPlayerPlayFilled />
          </div>
        )}
      </div>
      <div className="overflow-hidden">
        <p className="font-bold text-white text-xs sm:text-sm truncate">
          {name}
        </p>
        <p className="text-xs text-neutral-400 font-semibold truncate">
          {userName}
        </p>
      </div>
    </div>
  );
};

export default HomeMainCard;
