import { UserStateTypes } from "@/interfaces/types/index.interfaces";
import { Link } from "react-router-dom";

const SideArtistsLists = (props: UserStateTypes) => {
  const { name, picture, id } = props;

  return (
    <Link
      to={`/artist/${id}`}
      className="flex gap-3 text-xs font-semibold items-center hover:bg-hoverColor px-2 py-2 rounded-md duration-300 cursor-pointer"
    >
      <img
        className="w-[44px] h-[44px] rounded-full object-cover"
        src={picture}
        alt={name}
      />
      <div className="flex flex-col gap-1">
        <p className="text-sm text-white">{name}</p>
        <p>Artist</p>
      </div>
    </Link>
  );
};

export default SideArtistsLists;
