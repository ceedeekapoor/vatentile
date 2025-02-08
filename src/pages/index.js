import React, { useState, useEffect } from 'react';
import Countdown from '../components/Countdown';
import MusicPlayer from '../components/Music';
import LoveCalculator from '../components/Calculator';
import GamesSection from '../components/GamesSection';
import Question from '../components/Questions';
import { Helmet } from 'react-helmet';

const App = () => {
  const [isValentinesDay, setIsValentinesDay] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      // Get IST time
      const options = { timeZone: 'Asia/Kolkata' };
      const istTime = new Date().toLocaleString('en-US', options);
      const istDate = new Date(istTime);

      if (istDate.getHours() >= 16 && istDate.getMinutes() >= 15) {
        setIsValentinesDay(true);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Helmet>
        <title>Valentine - Home</title>
      </Helmet>
      {isValentinesDay ? (
        <>
          <LoveCalculator />
        </>
      ) : (
        <>
          <MusicPlayer />
          <Countdown />
          <GamesSection />
        </>
      )}
    </div>
  );
};

export default App;
