import { LuSearch } from "react-icons/lu";
import { GoHomeFill } from "react-icons/go";
import { VscLibrary } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { BoxComp } from "./sideBox";
import SideArtistsLists from "./sideArtistsLists";
import useSideBarDetailsHook from "@/hooks/useSideBarDetailsHook";
import React, { useState } from "react";
import { debounce } from "lodash";

export default function Sidebar() {
  const [queryName, setQueryName] = useState<string | null>(null);

  const { artistLists } = useSideBarDetailsHook(queryName);

  const updateNameQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryName(e?.target?.value);
  };

  //!This will delay the input time its like settime out but the set time out will run after each given seconds like for each input which is bad
  //! But this will take only once after required seconds
  const debounceOnChange = debounce(updateNameQuery, 500);
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
            {/* <span className="p-1 rounded-full hover:bg-hoverColor cursor-pointer hover:text-white duration-300">
              <GoSearch className="text-lg" />
            </span> */}
            <div className="">
              <form action="" className="relative mx-auto w-max">
                <input
                  type="search"
                  placeholder="Search artists"
                  onChange={debounceOnChange}
                  className="peer cursor-pointer relative z-10 h-10 w-6 rounded-full bg-transparent  pl-10 outline-none transition-all duration-300 ease-in-out focus:w-full focus:border focus:cursor-text focus:border-neutral-700 focus:pl-16 focus:pr-4"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-y-0 my-auto h-9 w-11 border-r border-transparent stroke-gray-500 px-3 transition-all duration-300 ease-in-out peer-focus:border-neutral-700 peer-focus:stroke-neutral-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </form>
            </div>
            <div className="flex gap-2 items-center  hover:text-white duration-300 cursor-pointer ">
              <p className="font-semibold">Recents</p>
              <RxHamburgerMenu />
            </div>
          </div>
        </div>
        <div className="p-1 h-[492px] overflow-hidden overflow-y-auto">
          {artistLists?.map((data, index) => (
            <span key={index}>
              <SideArtistsLists
                key={index}
                id={data.id}
                name={data.name}
                picture={data.picture}
                email=""
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
