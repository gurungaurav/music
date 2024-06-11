import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import musicPlayerSlice from "../slice/musicPlayerSlice";
import {
  loadMusicPlayerState,
  saveMusicPlayerState,
} from "@/utils/localStorage-handler";
import { IMusicPlayerState } from "@/interfaces/music/music.interfaces";

// Load the preloaded state for the music player
const preloadedMusicPlayerState: IMusicPlayerState | undefined =
  loadMusicPlayerState();

const preloadedState = {
  musicPlayer: preloadedMusicPlayerState,
};

const rootReducer = combineReducers({
  user: userSlice,
  musicPlayer: musicPlayerSlice,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState as Partial<ReturnType<typeof rootReducer>>,
});

store.subscribe(() => {
  saveMusicPlayerState(store.getState().musicPlayer);
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
