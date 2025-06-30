import React from "react";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { HomeMainArtistsWithHoverProps } from "../../interfaces/types/components/component.interfaces";
import { Link } from "react-router-dom";

const HomeMainBox: React.FC<HomeMainArtistsWithHoverProps> = (
  props: HomeMainArtistsWithHoverProps
) => {
  const { onMouseEnter, onMouseLeave, picture, name, isHovered, id } = props;
  return (
    <Link
      to={`/artist/${id}`}
      className={`flex justify-between rounded-md bg-hoverColor items-center cursor-pointer hover:bg-neutral-700 duration-300 min-h-[60px] sm:min-h-[75px]`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      // role="button"
    >
      <div className="flex gap-2 sm:gap-3 items-center text-xs sm:text-sm font-semibold text-white overflow-hidden">
        <img
          alt={"no image"}
          src={picture}
          className="w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] rounded-l-md object-cover flex-shrink-0"
        />
        <p className="truncate">{name}</p>
      </div>
      {isHovered && (
        <div
          className={`p-2 sm:p-3 text-lg sm:text-xl mr-3 sm:mr-6 ${"bg-green-500 text-black"} rounded-full flex-shrink-0`}
        >
          <TbPlayerPlayFilled />
        </div>
      )}
    </Link>
  );
};

export default HomeMainBox;
