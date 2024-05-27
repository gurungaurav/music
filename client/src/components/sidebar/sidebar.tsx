import { LuSearch } from "react-icons/lu";
import { GoHomeFill, GoSearch } from "react-icons/go";
import { VscLibrary } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { BoxComp } from "./sideBox";
import liked from "../../assets/liked.jpg";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-2 w-[20%] h-full">
      <div className="bg-primaryColor p-4 rounded-md flex flex-col gap-4  ">
        <BoxComp icon={<GoHomeFill />} name="Home" path="/" />
        <BoxComp icon={<LuSearch />} name="Search" path="/search" />
      </div>
      <div className="bg-primaryColor  rounded-md flex flex-col">
        <div className="p-4">
          <BoxComp icon={<VscLibrary />} name="Your library" path="/none" />
          <div className="flex justify-between text-xs mt-4">
            <span className="p-1 rounded-full hover:bg-hoverColor cursor-pointer hover:text-white duration-300">
              <GoSearch className="text-lg" />
            </span>
            <div className="flex gap-2 items-center  hover:text-white duration-300 cursor-pointer ">
              <p className="font-semibold">Recents</p>
              <RxHamburgerMenu />
            </div>
          </div>
        </div>
        <div className="p-1">
          <div className="flex gap-3 text-xs  font-semibold items-center hover:bg-hoverColor px-2 py-2 rounded-md duration-300 cursor-pointer">
            <img className="w-[44px] h-[44px] rounded-md" src={liked}></img>
            <div className="flex flex-col gap-1">
              <p className="text-sm">Liked Songs</p>
              <span className="flex gap-2">
                <p>Playlist</p>
                <p>.</p>
                <p>420 songs</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
