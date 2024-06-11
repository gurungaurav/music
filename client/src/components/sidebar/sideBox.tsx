import { BoxCompProps } from "@/interfaces/types/sidebar/sidebar.interfaces";
import { NavLink } from "react-router-dom";

export const BoxComp: React.FC<BoxCompProps> = ({ icon, name, path }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex gap-4 items-center hover:text-white duration-300 cursor-pointer ${
          isActive ? "text-white" : ""
        }`
      }
    >
      <p className="text-2xl">{icon}</p>
      <p className="text-sm font-semibold">{name}</p>
    </NavLink>
  );
};
