import { ReactNode } from "react";
import { IconType } from "react-icons";

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

//For side bar comp
export interface BoxCompProps {
  icon: React.ReactElement<IconType>;
  name: string;
  path: string;
}
