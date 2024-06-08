import { ReactNode } from "react";

export interface LayoutPropTypes {
  children: ReactNode;
}

export interface RouteTypes {
  id: string;
  path: string;
  element: React.ComponentType;
  hasHomeLayout: boolean;
  hasAdminLayout: boolean;
  requiredAuth?: boolean;
  layout?: React.LazyExoticComponent<any>;
}

export interface UserStateTypes {
  id: string;
  picture: string;
  name: string;
  email: string;
}

export interface MusicTypes {
  name: string;
  url: File | null | string;
  image: File | null | string;
}

export interface MusicWithUserTypes extends MusicTypes {
  user: UserStateTypes;
}

export interface AudioTrackTypes {
  name: string;
  singer: string;
  cover: string;
  musicSrc: string;
}
