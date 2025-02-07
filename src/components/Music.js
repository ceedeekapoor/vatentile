import React, { useState, useEffect, useRef } from "react";
import "../styles/musicPlayer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio()); // useRef to persist the audio element

  const albums = [
    "Chet baker",
    "Dayglow",
    "Cigarettes After Sex",
    "Matthew Ifield",
    "Rex Orange County",
    "The Cardigans",
  ];
  const trackNames = [
    "Like Someone In Love",
    "Close to You",
    "K.",
    "Like I Do",
    "THE SHADE",
    "Lovefool",
  ];
  const albumArtworks = [
    "/images/1.jpg",
    "/images/2.webp",
    "/images/3.png",
    "/images/4.jpeg",
    "/images/5.jpg",
    "/images/6.jpeg",
  ];
  const trackUrl = [
    "/audio/1.mp3",
    "/audio/2.mp3",
    "/audio/3.mp3",
    "/audio/4.mp3",
    "/audio/5.mp3",
    "/audio/6.mp3",
  ];

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = trackUrl[currentTrackIndex]; // Update audio source when track changes
    audio.load(); // Load the new track

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleTrackEnd = () => {
      playNext(); // Auto play next song
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleTrackEnd);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleTrackEnd);
    };
  }, [currentTrackIndex]);

  const playPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playPrevious = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + trackUrl.length) % trackUrl.length);
    setIsPlaying(true);
  };

  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % trackUrl.length);
    setIsPlaying(true);
  };

  const handleSeekBarClick = (e) => {
    const seekBar = e.currentTarget;
    const rect = seekBar.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const newTime = position * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const seekBarWidth = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div id="player-container">
      <div id="player-bg-artwork"></div>
      <div id="player-bg-layer"></div>
      <div id="player">
        <div id="player-track" className={isPlaying ? "active" : ""}>
          <div id="album-name">{albums[currentTrackIndex]}</div>
          <div id="track-name">{trackNames[currentTrackIndex]}</div>
          <div id="track-time" className={isPlaying ? "active" : ""}>
            <div id="current-time">{formatTime(currentTime)}</div>
            <div id="track-length">{formatTime(duration)}</div>
          </div>
          <div id="seek-bar-container" onClick={handleSeekBarClick}>
            <div id="seek-time"></div>
            <div id="s-hover"></div>
            <div id="seek-bar" style={{ width: `${seekBarWidth}%` }}></div>
          </div>
        </div>
        <div id="player-content">
          <div id="album-art" className={isPlaying ? "active" : ""}>
            <img src={albumArtworks[currentTrackIndex]} className="active" alt="Album Art" />
          </div>
          <div id="player-controls">
            <div className="control">
              <div className="button" onClick={playPrevious}>
                <FontAwesomeIcon className="action-button" icon={faBackward} />
              </div>
            </div>
            <div className="control">
              <div className="button" onClick={playPause}>
                <FontAwesomeIcon className="action-button" icon={isPlaying ? faPause : faPlay} />
              </div>
            </div>
            <div className="control">
              <div className="button" onClick={playNext}>
                <FontAwesomeIcon className="action-button" icon={faForward} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
