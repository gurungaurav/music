import React, { useRef, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaVolumeUp,
  FaVolumeMute,
  FaPauseCircle,
  FaPlayCircle,
} from "react-icons/fa";
import { FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import {
  setPlaying,
  setCurrentTrack,
  setVolume,
  setTrackProgress,
} from "../../redux/slice/musicPlayerSlice";

const MusicPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  const { isPlaying, currentTrack, volume, trackProgress, audioList } =
    useSelector((state: any) => state.musicPlayer);

  const { duration } = audioRef.current || {};
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      audioRef.current?.play();
      intervalRef.current = window.setInterval(() => {
        if (audioRef.current)
          dispatch(setTrackProgress(audioRef.current.currentTime));
      }, 1000);
    }
    dispatch(setPlaying(!isPlaying));
  };

  const handleNext = () => {
    dispatch(setCurrentTrack((currentTrack + 1) % audioList.length));
    dispatch(setPlaying(true));
  };

  const handlePrev = () => {
    dispatch(
      setCurrentTrack((currentTrack - 1 + audioList.length) % audioList.length)
    );
    dispatch(setPlaying(true));
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    dispatch(setVolume(volume));
    if (audioRef.current) audioRef.current.volume = volume;
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * (duration || 0);
    if (audioRef.current) audioRef.current.currentTime = newTime;
    dispatch(setTrackProgress(newTime));
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = new Audio(audioList[currentTrack].musicSrc);
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
        intervalRef.current = window.setInterval(() => {
          if (audioRef.current)
            dispatch(setTrackProgress(audioRef.current.currentTime));
        }, 1000);
      }
    }
  }, [currentTrack]);

  if (!audioList || audioList.length === 0) {
    return <div className="p-4 text-center">No audio available</div>;
  }

  if (currentTrack < 0 || currentTrack >= audioList.length) {
    return <div className="p-4 text-center">Invalid current track index</div>;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-2 z-50">
      <audio ref={audioRef} />

      <div className="  flex flex-col md:flex-row items-center gap-4 justify-between">
        {/* Track Info */}
        <div className="flex items-center w-full md:w-auto min-w-[200px]">
          <img
            src={audioList[currentTrack].cover}
            alt={audioList[currentTrack].name}
            className="w-12 h-12 md:w-14 md:h-14 rounded-md mr-3 object-cover"
          />
          <div className="truncate">
            <h3 className="text-sm md:text-base font-semibold truncate">
              {audioList[currentTrack].name}
            </h3>
            <p className="text-xs md:text-sm text-gray-400 truncate">
              {audioList[currentTrack].singer}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex-1 w-full max-w-2xl">
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex items-center gap-4 md:gap-6">
              <FaBackwardStep
                onClick={handlePrev}
                className="cursor-pointer text-lg md:text-xl hover:text-gray-300 transition-colors"
              />
              {isPlaying ? (
                <FaPauseCircle
                  onClick={handlePlayPause}
                  className="cursor-pointer text-3xl md:text-4xl hover:text-gray-300 transition-colors"
                />
              ) : (
                <FaPlayCircle
                  onClick={handlePlayPause}
                  className="cursor-pointer text-3xl md:text-4xl hover:text-gray-300 transition-colors"
                />
              )}
              <FaForwardStep
                onClick={handleNext}
                className="cursor-pointer text-lg md:text-xl hover:text-gray-300 transition-colors"
              />
            </div>
            <div className="w-full flex items-center gap-2">
              <span className="text-xs text-gray-400 hidden sm:inline">
                {formatTime(trackProgress)}
              </span>
              <input
                type="range"
                value={currentPercentage}
                step="0.1"
                min="0"
                max="100"
                onChange={handleSeek}
                className="flex-1 h-1 md:h-2 bg-gray-600 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
              <span className="text-xs text-gray-400 hidden sm:inline">
                {formatTime(duration || 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center w-full md:w-auto md:min-w-[150px] justify-end">
          <div className="hidden sm:flex items-center gap-2 w-full max-w-[150px]">
            {volume > 0 ? (
              <FaVolumeUp className="text-gray-400" />
            ) : (
              <FaVolumeMute className="text-gray-400" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 md:h-2 bg-gray-600 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format time (mm:ss)
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export default MusicPlayer;
