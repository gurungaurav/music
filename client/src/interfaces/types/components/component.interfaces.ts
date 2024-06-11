import { FormikProps } from "formik";
import { MusicTypes, UserStateTypes } from "../index.interfaces";

export interface HomeMainArtistsWithHoverProps extends UserStateTypes {
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export interface HomeMainSongsWithHoverProps extends MusicTypes {
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export interface FormInputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  formik: FormikProps<any>;
}
