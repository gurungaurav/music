// musicPlayerSlice.ts
import { IMusicPlayerState } from "@/interfaces/music/music.interfaces";
import { AudioTrackTypes } from "@/interfaces/types/index.interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IMusicPlayerState = {
  isPlaying: false,
  currentTrack: 0,
  volume: 1,
  trackProgress: 0,
  audioList: [],
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<number>) => {
      state.currentTrack = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setTrackProgress: (state, action: PayloadAction<number>) => {
      state.trackProgress = action.payload;
    },
    setAudioList: (state, action: PayloadAction<AudioTrackTypes[]>) => {
      state.audioList = action.payload;
    },
  },
});

export const {
  setPlaying,
  setCurrentTrack,
  setVolume,
  setTrackProgress,
  setAudioList,
} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
