import "./App.css";
import React, { useState, useEffect } from "react";
import { intervalToDuration } from "date-fns";

const DEFAULT_BREAK_LENGTH_VALUE = 5;
const DEFAULT_SESSION_LENGTH_VALUE = 25;
const BREAK_DECREMENT_ID = "break-decrement";
const BREAK_INCREMENT_ID = "break-increment";
const SESSION_DECREMENT_ID = "session-decrement";
const SESSION_INCREMENT_ID = "session-increment";

const zeroPad = (num) => String(num).padStart(2, "0");

let intervalId = null;

function App() {
  const [sessionLengthValue, setSessionLengthValue] = useState(
    DEFAULT_SESSION_LENGTH_VALUE
  );
  const [breakLengthValue, setBreakLengthValue] = useState(
    DEFAULT_BREAK_LENGTH_VALUE
  );

  // This condition is active when session is active, otherwise would be the break (false)
  const [isSessionActive, setIsSessionActive] = useState(true);

  const [sessionTimerValue, setSessionTimerValue] = useState(0);
  const [breakTimerValue, setBreakTimerValue] = useState(0);

  const [hasTimerStarted, setHasTimerStarted] = useState(false);

  const sessionDuration = intervalToDuration({
    start: sessionTimerValue * 1000,
    end: sessionLengthValue * 60 * 1000,
  });

  const breakDuration = intervalToDuration({
    start: breakTimerValue * 1000,
    end: breakLengthValue * 60 * 1000,
  });

  useEffect(() => {
    if (hasTimerStarted) {
      intervalId = setInterval(() => {
        if (isSessionActive) {
          setSessionTimerValue((sessionTimerValue) => sessionTimerValue + 1);
        } else {
          setBreakTimerValue((breakTimerValue) => breakTimerValue + 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [hasTimerStarted, isSessionActive]); // useEffect only runs when the variable inside the brackets has changed

  if (
    sessionDuration.hours === 0 &&
    sessionDuration.minutes === 0 &&
    sessionDuration.seconds === 0 &&
    isSessionActive
  ) {
    setIsSessionActive(false);
    setSessionTimerValue(0);
  }

  if (
    breakDuration.hours === 0 &&
    breakDuration.minutes === 0 &&
    breakDuration.seconds === 0 &&
    !isSessionActive
  ) {
    setIsSessionActive(true);
    setBreakTimerValue(0);
  }

  const handleResetClick = () => {
    setBreakLengthValue(DEFAULT_BREAK_LENGTH_VALUE);
    setSessionLengthValue(DEFAULT_SESSION_LENGTH_VALUE);
    setSessionTimerValue(0);
  };

  const handleBreakClick = (event) => {
    const idClicked = event.target.id;

    if (idClicked === BREAK_DECREMENT_ID) {
      setBreakLengthValue(Math.max(breakLengthValue - 1, 0));
    } else if (idClicked === BREAK_INCREMENT_ID) {
      setBreakLengthValue(Math.min(breakLengthValue + 1, 60));
    }
  };

  const handleSessionClick = (event) => {
    const idClicked = event.target.id;

    if (idClicked === SESSION_DECREMENT_ID) {
      setSessionLengthValue(Math.max(sessionLengthValue - 1, 0));
    } else if (idClicked === SESSION_INCREMENT_ID) {
      setSessionLengthValue(Math.min(sessionLengthValue + 1, 60));
    }
  };

  const handleStartStopClick = () => {
    setHasTimerStarted(!hasTimerStarted);
  };

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div id="break-label">
        <h3>Break Length</h3>
        <button id={BREAK_DECREMENT_ID} onClick={handleBreakClick}>
          Break -
        </button>
        <div id="break-length">{breakLengthValue}</div>
        <button id={BREAK_INCREMENT_ID} onClick={handleBreakClick}>
          Break +
        </button>
      </div>
      <div id="session-label">
        <h3>Session Length</h3>
        <button id={SESSION_DECREMENT_ID} onClick={handleSessionClick}>
          Session -
        </button>
        <div id="session-length">{sessionLengthValue}</div>
        <button id={SESSION_INCREMENT_ID} onClick={handleSessionClick}>
          Session +
        </button>
      </div>
      <div id="timer-label">
        {isSessionActive && (
          <>
            <h3>Session</h3>
            <div id="time-left">
              {zeroPad(sessionDuration.hours)}:
              {zeroPad(sessionDuration.minutes)}:
              {zeroPad(sessionDuration.seconds)}
            </div>
          </>
        )}

        {!isSessionActive && (
          <>
            <h3>Break</h3>
            <div id="time-left">
              {zeroPad(breakDuration.hours)}:{zeroPad(breakDuration.minutes)}:
              {zeroPad(breakDuration.seconds)}
            </div>
          </>
        )}
        <button id="start_stop" onClick={handleStartStopClick}>
          Start/Stop
        </button>
        <button id="reset" onClick={handleResetClick}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
