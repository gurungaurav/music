import React from "react";
import { LayoutPropTypes } from "../interfaces/types/index.interfaces";
import Sidebar from "../components/sidebar/sidebar";

const HomeLayout: React.FC<LayoutPropTypes> = ({ children }) => {
  return (
    <div className="flex w-full p-2 gap-2">
      <Sidebar />
      {children}
    </div>
  );
};

export default HomeLayout;
