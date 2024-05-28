import React from "react";
import { HomeMainArtistsWithHoverProps } from "../../interfaces/types/components/component.interfaces";
import { TbPlayerPlayFilled } from "react-icons/tb";

const HomeMainCard: React.FC<HomeMainArtistsWithHoverProps> = ({
  id,
  image,
  title,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className="flex flex-col px-4 pt-4 pb-8 gap-2  rounded-md  bg-neutral-900 hover:bg-hoverColor duration-300 cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex relative items-center justify-center shadow-lg  rounded-full">
        <img
          src={image}
          className="w-[157px] h-[157px] rounded-full object-cover "
        ></img>
        {isHovered && (
          <div
            className={`p-3 text-xl mr-6 absolute bottom-2 -right-2   ${"bg-green-500 text-black"} rounded-full`}
          >
            <TbPlayerPlayFilled />
          </div>
        )}
      </div>
      <div className="">
        <p className="font-bold text-white ">{title} </p>
        <p className="text-sm font-semibold">Artist</p>
      </div>
    </div>
  );
};

export default HomeMainCard;
