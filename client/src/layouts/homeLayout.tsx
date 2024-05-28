import React from "react";
import { LayoutPropTypes } from "../interfaces/types/index.interfaces";
import Sidebar from "../components/sidebar/sidebar";
import Navbar from "../components/navbar/navbar";
import BottomPlayer from "../components/bottombar/bottomPlayer";

const HomeLayout: React.FC<LayoutPropTypes> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full p-2 gap-2">
        <Sidebar />
        <div className="flex flex-col w-[80%]">
          <Navbar />
          {children}
        </div>
      </div>
      <BottomPlayer />
    </div>
  );
};

export default HomeLayout;
