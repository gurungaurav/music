import { IconType } from "react-icons";

//For side bar comp
export interface BoxCompProps {
  icon: React.ReactElement<IconType>;
  name: string;
  path: string;
}

export interface SideBarArtistsProps {
  image: string;
  title: string;
  artist: string;
  name: string;
}
