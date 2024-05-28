import { FormikProps } from "formik";

export interface HomeMainArtistsProps {
  id: string;
  image: string;
  title: string;
}

export interface HomeMainArtistsWithHoverProps extends HomeMainArtistsProps {
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
