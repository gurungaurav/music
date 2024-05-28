import React from "react";
import { HomeMainArtistsProps } from "../../interfaces/types/components/component.interfaces";

const SideArtistsLists: React.FC<HomeMainArtistsProps> = ({ image, title }) => {
  return (
    <div className="flex gap-3 text-xs font-semibold items-center hover:bg-hoverColor px-2 py-2 rounded-md duration-300 cursor-pointer">
      <img
        className="w-[44px] h-[44px] rounded-full object-cover"
        src={image}
        alt={title}
      />
      <div className="flex flex-col gap-1">
        <p className="text-sm text-white">{title}</p>
        <p>Artist</p>
      </div>
    </div>
  );
};

export default SideArtistsLists;
