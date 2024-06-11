import { UserStateTypes } from "@/interfaces/types/index.interfaces";
import { IMusicPlayerState } from "@/interfaces/music/music.interfaces";

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

export const loadMusicPlayerState = (): IMusicPlayerState | undefined => {
  try {
    const serializedState = localStorage.getItem("musicPlayerState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as IMusicPlayerState;
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

export const saveMusicPlayerState = (state: IMusicPlayerState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("musicPlayerState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};
