import React from "react";
import { LayoutPropTypes } from "../interfaces/types/index.interfaces";
import Sidebar from "../components/sidebar/sidebar";
import Navbar from "../components/navbar/navbar";
import MusicPlayer from "@/components/music/musicPlayer";

const HomeLayout: React.FC<LayoutPropTypes> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full  gap-2">
        <Sidebar />
        <div className="flex flex-col w-full md:w-[80%]   rounded-md overflow-hidden overflow-y-auto pb-20 ">
          <Navbar />
          {children}
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
};

export default HomeLayout;
