import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import {
  FaVolumeUp,
  FaVolumeMute,
  FaPauseCircle,
  FaPlayCircle,
} from "react-icons/fa";
import { FaForwardStep, FaBackwardStep } from "react-icons/fa6";

interface AudioTrack {
  name: string;
  singer: string;
  cover: string;
  musicSrc: string;
}

interface MusicPlayerProps {
  audioList: AudioTrack[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioList }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(1);
  const [trackProgress, setTrackProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  const { duration } = audioRef.current || {};
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      audioRef.current?.play();
      intervalRef.current = window.setInterval(() => {
        if (audioRef.current) setTrackProgress(audioRef.current.currentTime);
      }, 1000);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % audioList.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + audioList.length) % audioList.length);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    if (audioRef.current) audioRef.current.volume = parseFloat(e.target.value);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * (duration || 0);
    if (audioRef.current) audioRef.current.currentTime = newTime;
    setTrackProgress(newTime);
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
          if (audioRef.current) setTrackProgress(audioRef.current.currentTime);
        }, 1000);
      }
    }
  }, [currentTrack]);

  return (
    <div className="flex  justify-between  items-center bg-black text-white w-full px-4  ">
      <audio ref={audioRef} />
      <div className="flex items-center  w-full">
        <img
          src={audioList[currentTrack].cover}
          alt={audioList[currentTrack].name}
          className="w-[50px] h-[51px] rounded-md mr-4"
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
        <div className="flex  gap-5 w-full items-center justify-center ">
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
          className="w-full h-1 bg-gray-300 rounded-lg "
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
          className="h-1 "
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
