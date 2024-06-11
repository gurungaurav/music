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
    return <div>No audio available</div>;
  }

  if (currentTrack < 0 || currentTrack >= audioList.length) {
    return <div>Invalid current track index</div>;
  }

  console.log(audioList[currentTrack]); // Check the value of audioList[currentTrack]

  return (
    <div className="flex justify-between items-center bg-black text-white w-full px-4">
      <audio ref={audioRef} />
      <div className="flex items-center w-full">
        <img
          src={audioList[currentTrack].cover}
          alt={audioList[currentTrack].name}
          className="w-[50px] h-[51px] rounded-md mr-4 object-cover"
        />
        <div>
          <h3 className="text-xs font-semibold">
            {audioList[currentTrack].name}
          </h3>
          <p className="text-[10px] text-gray-400">
            {audioList[currentTrack].singer}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full items-center justify-center">
        <div className="flex gap-5 w-full items-center justify-center">
          <FaBackwardStep
            onClick={handlePrev}
            className="cursor-pointer text-xl"
          />
          {isPlaying ? (
            <FaPauseCircle
              onClick={handlePlayPause}
              className="cursor-pointer text-3xl"
            />
          ) : (
            <FaPlayCircle
              onClick={handlePlayPause}
              className="cursor-pointer text-3xl"
            />
          )}
          <FaForwardStep
            onClick={handleNext}
            className="cursor-pointer text-xl"
          />
        </div>
        <input
          type="range"
          value={currentPercentage}
          step="0.1"
          min="0"
          max="100"
          onChange={handleSeek}
          className="w-full h-1 bg-gray-300 rounded-lg"
        />
      </div>
      <div className="flex justify-end w-full items-center">
        {volume > 0 ? (
          <FaVolumeUp className="mr-2" />
        ) : (
          <FaVolumeMute className="mr-2" />
        )}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="h-1"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
