import { useEffect, useState } from "react";

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let timerId: number = 0;
    const startTimer = () => {
      timerId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    };

    const stopTimer = () => {
      clearInterval(timerId);
    };

    if (isRunning) {
      startTimer();
    } else {
      stopTimer();
    }

    return () => {
      stopTimer();
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (milliseconds: number): string => {
    const milliSeconds = milliseconds % 100;
    const seconds = Math.floor((milliseconds % 6000) / 100);
    const minutes = Math.floor((milliSeconds % 360000) / 6000);
    const hours = Math.floor(milliSeconds / 360000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="stopwatch">
      <h1 className="title">Stopwatch</h1>
      <div className="time">{formatTime(time)}</div>
      <button className="btn" onClick={handleStartStop}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button className="btn" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default StopWatch;
