import React from "react";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { HomeMainArtistsWithHoverProps } from "../../interfaces/types/components/component.interfaces";

const HomeMainBox: React.FC<HomeMainArtistsWithHoverProps> = ({
  picture,
  name,
  isHovered,
  email,
  id,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className={`flex justify-between rounded-md bg-hoverColor items-center cursor-pointer hover:bg-neutral-700 duration-300`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      // role="button"
    >
      <div className="flex gap-3 items-center text-sm font-semibold text-white">
        <img
          alt={"no image"}
          src={picture}
          className="w-[75px] h-[75px] rounded-l-md object-cover"
        />
        <p>{name}</p>
      </div>
      {isHovered && (
        <div
          className={`p-3 text-xl mr-6  ${"bg-green-500 text-black"} rounded-full`}
        >
          <TbPlayerPlayFilled />
        </div>
      )}
    </div>
  );
};

export default HomeMainBox;
