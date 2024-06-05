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
  picture: string;
  name: string;
  email: string;
}

export interface AddMusicTypes {
  title: string;
  music: File | null;
  image: File | null;
}
