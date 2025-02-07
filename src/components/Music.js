import React, { useState, useEffect } from 'react';
import '../styles/musicPlayer.css';  // Add the CSS file for the player
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward, faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);  // Initialize to 0 instead of -1
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const albums = [
    'Chet baker',
    'Dayglow',
    'Cigarettes After Sex',
    'Matthew Ifield',
    'Rex Orange County',
    'The Cardigans'
  ];
  const trackNames = [
    'Like Someone In Love',
    'Close to You',
    'K.',
    'Like I Do',
    'THE SHADE',
    'Lovefool'
  ];
  const albumArtworks = [
    '/images/1.jpg',
    '/images/2.webp',
    '/images/3.png',
    '/images/4.jpeg',
    '/images/5.jpg',
    '/images/6.jpeg'
  ];
  const trackUrl = [
    '/audio/1.mp3',
    '/audio/2.mp3',
    '/audio/3.mp3',
    '/audio/4.mp3',
    '/audio/5.mp3',
    '/audio/6.mp3'
  ];
  

  const [audio, setAudio] = useState(new Audio(trackUrl[0]));
  const [buffering, setBuffering] = useState(false);

  useEffect(() => {
    const currentAudio = audio;
    currentAudio.addEventListener('timeupdate', handleTimeUpdate);
    currentAudio.addEventListener('ended', handleTrackEnd);
    currentAudio.addEventListener('canplay', () => setBuffering(false));

    return () => {
      currentAudio.removeEventListener('timeupdate', handleTimeUpdate);
      currentAudio.removeEventListener('ended', handleTrackEnd);
    };
  }, [audio]);

  const handleTimeUpdate = () => {
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
  };

  const handleTrackEnd = () => {
    audio.pause(); // Stop current audio
    audio.currentTime = 0; // Reset time
    const nextTrackIndex = (currentTrackIndex + 1) % trackUrl.length;
    setCurrentTrackIndex(nextTrackIndex);
    const newAudio = new Audio(trackUrl[nextTrackIndex]);
    setAudio(newAudio);
    newAudio.play(); // Play new audio
    setIsPlaying(true);
  };
  const playPause = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    setIsPlaying(!isPlaying);
  };


  const playPrevious = () => {
    audio.pause(); // Stop current audio
    audio.currentTime = 0; // Reset time
    const previousTrackIndex = (currentTrackIndex - 1 + trackUrl.length) % trackUrl.length;
    setCurrentTrackIndex(previousTrackIndex);
    const newAudio = new Audio(trackUrl[previousTrackIndex]);
    setAudio(newAudio);
    newAudio.play(); // Play new audio
    setIsPlaying(true);
  };

  const playNext = () => {
    audio.pause(); // Stop current audio
    audio.currentTime = 0; // Reset time
    const nextTrackIndex = (currentTrackIndex + 1) % trackUrl.length;
    setCurrentTrackIndex(nextTrackIndex);
    const newAudio = new Audio(trackUrl[nextTrackIndex]);
    setAudio(newAudio);
    newAudio.play(); // Play new audio
    setIsPlaying(true);
  };
  

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
  const handleSeekBarClick = (e) => {
    const seekBar = e.currentTarget;
    const rect = seekBar.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const newTime = position * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Calculate seek bar width based on current progress
  const seekBarWidth = duration ? (currentTime / duration) * 100 : 0;
  return (
    <div id="player-container">
      <div id="player-bg-artwork"></div>
      <div id="player-bg-layer"></div>
      <div id="player">
        <div id="player-track" className={isPlaying ? 'active' : ''}>
          <div id="album-name">{albums[currentTrackIndex]}</div>
          <div id="track-name">{trackNames[currentTrackIndex]}</div>
          <div id="track-time" className={isPlaying ? 'active' : ''}>
            <div id="current-time">{formatTime(currentTime)}</div>
            <div id="track-length">{formatTime(duration)}</div>
          </div>
          <div id="seek-bar-container" onClick={handleSeekBarClick}>
      <div id="seek-time"></div>
      <div id="s-hover"></div>
      <div 
        id="seek-bar" 
        style={{ width: `${seekBarWidth}%` }}
      ></div>
          </div>
        </div>
        <div id="player-content">
          <div id="album-art" className={`${isPlaying ? 'active' : ''} ${buffering ? 'buffering' : ''}`}>
            <img
              src={`${albumArtworks[currentTrackIndex]}`}
              className="active"
              alt="Album Art"
            />
            <div id="buffer-box">Buffering ...</div>
          </div>
          <div id="player-controls">
            <div className="control">
              <div className="button" onClick={playPrevious}>
                <FontAwesomeIcon className='action-button' icon={faBackward} />
              </div>
            </div>
            <div className="control">
              <div className="button" onClick={playPause}>
                <FontAwesomeIcon className='action-button' icon={isPlaying ? faPause : faPlay} />
              </div>
            </div>
            <div className="control">
              <div className="button" onClick={playNext}>
                <FontAwesomeIcon className='action-button' icon={faForward} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
