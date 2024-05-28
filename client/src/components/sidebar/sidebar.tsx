import { LuSearch } from "react-icons/lu";
import { GoHomeFill, GoSearch } from "react-icons/go";
import { VscLibrary } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { BoxComp } from "./sideBox";
import liked from "../../assets/bill.jfif";
import SideArtistsLists from "./sideArtistsLists";
import { HomeMainArtistsProps } from "../../interfaces/types/components/component.interfaces";

export default function Sidebar() {
  const data: HomeMainArtistsProps[] = [
    {
      id: "1",
      image: liked,
      title: "Liked songs",
    },
    {
      id: "2",
      image: liked,
      title: "Liked songs",
    },
    {
      id: "3",
      image: liked,
      title: "Liked songs",
    },
    {
      id: "4",
      image: liked,
      title: "Liked songs",
    },
    {
      id: "5",
      image: liked,
      title: "Liked songs",
    },
    {
      id: "6",
      image: liked,
      title: "Liked songs",
    },
    {
      id: "7",
      image: liked,
      title: "Liked songs",
    },
    {
      id: "8",
      image: liked,
      title: "Liked songs",
    },
    {
      id: "9",
      image: liked,
      title: "Liked songs",
    },
    {
      id: "10",
      image: liked,
      title: "Liked songs",
    },
  ];
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
        <div className="p-1 h-[32rem] overflow-hidden overflow-y-auto">
          {data?.map((data, index) => (
            <span key={index}>
              <SideArtistsLists
                id={data.id}
                image={data.image}
                title={data.title}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
