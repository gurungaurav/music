import { UserStateTypes } from "@/interfaces/types/index.interfaces";

export const setLocalStorage = ({
  id,
  picture,
  name,
  email,
}: UserStateTypes) => {
  const userDetails = JSON.stringify({ id, picture, name, email });

  localStorage.setItem("data", userDetails);
};

export const getLocalStorage = (): UserStateTypes | null => {
  const userDetails = localStorage.getItem("data");

  if (userDetails) {
    return JSON.parse(userDetails) as UserStateTypes;
  }

  return null;
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
