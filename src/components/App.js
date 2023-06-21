import React, { useRef, useState, useEffect } from "react";
import "../styles/App.css";

const App = () => {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    // console.log(Date.now());
    startTime.current = Date.now() - currentTime;
    intervalRef.current = setInterval(() => {
      setCurrentTime(Date.now() - startTime.current);
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  const lapTimer = () => {
    setLaps((prevLaps) => [...prevLaps, currentTime]);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setCurrentTime(0);
    setLaps([]);
  };

  return (
    <div id="main">
      <section>
        <h1 className="seconds-elapsed">{(currentTime / 1000).toFixed(3)}</h1>
        <section className="buttons">
          <button className="start-btn" onClick={startTimer}>
            START
          </button>
          <button className="stop-btn" onClick={stopTimer}>
            STOP
          </button>
          <button className="lap-btn" onClick={lapTimer}>
            LAP
          </button>
          <button className="reset-btn" onClick={resetTimer}>
            RESET
          </button>
        </section>
      </section>
      {laps.length>0 && (<section className="lap-section">
        <h2>Laps</h2>
        <section className="laps">
          { laps.map((lap, index) => (
            <p key={index} className="lap-time">
              {(lap / 1000).toFixed(3)}
            </p>
          ))}
        </section>
      </section>)}
    </div>
  );
};

export default App;
