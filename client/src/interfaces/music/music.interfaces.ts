import { AudioTrackTypes } from "../types/index.interfaces";

export interface IMusicPlayerState {
  isPlaying: boolean;
  currentTrack: number;
  volume: number;
  trackProgress: number;
  audioList: AudioTrackTypes[];
}
