import React, { useState, useEffect } from 'react';
import '../styles/countdown.css';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const options = { timeZone: 'Asia/Kolkata' };
      const istTime = new Date().toLocaleString('en-US', options);
      const now = new Date(istTime);
      
      const targetTime = new Date(istTime);
      targetTime.setHours(16, 15, 0);

      const diff = targetTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft('Time is up!');
      } else {
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown">
      <h1>Countdown for surprise</h1>
      <p>{timeLeft}</p>
    </div>
  );
};

export default Countdown;
