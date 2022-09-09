import "./App.css";
import React, { useState, useEffect } from "react";
import { intervalToDuration } from "date-fns";

const TWENTY_FIVE_MINUTES_MS = 1500000;
const DEFAULT_BREAK_LENGTH_VALUE = 5;
const DEFAULT_SESSION_LENGTH_VALUE = 25;
const BREAK_DECREMENT_ID = "break-decrement";
const BREAK_INCREMENT_ID = "break-increment";
const SESSION_DECREMENT_ID = "session-decrement";
const SESSION_INCREMENT_ID = "session-increment";

const zeroPad = (num) => String(num).padStart(2, "0");

let intervalId = null;

function App() {
  const [breakLengthValue, setBreakLengthValue] = useState(
    DEFAULT_BREAK_LENGTH_VALUE
  );
  const [sessionLengthValue, setSessionLengthValue] = useState(
    DEFAULT_SESSION_LENGTH_VALUE
  );

  // TODO: This condition is active when session is active, otherwise would be the break (false)
  const [isSessionActive, setIsSessionActive] = useState(true);

  // TODO: breakDuration. Timer actual es de session; hacer otro timer para break
  const [timerValue, setTimerValue] = useState(0);

  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const sessionDuration = intervalToDuration({
    start: timerValue * 1000,
    end: sessionLengthValue * 60 * 1000,
  });

  useEffect(() => {
    if (hasTimerStarted) {
      intervalId = setInterval(() => {
        setTimerValue((timerValue) => timerValue + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [hasTimerStarted]); // useEffect only runs when the variable inside the brackets has changed

  if (
    sessionDuration.hours === 0 &&
    sessionDuration.minutes === 0 &&
    sessionDuration.seconds === 0
  ) {
    setIsSessionActive(false);
  }

  const handleResetClick = () => {
    setBreakLengthValue(DEFAULT_BREAK_LENGTH_VALUE);
    setSessionLengthValue(DEFAULT_SESSION_LENGTH_VALUE);
    setTimerValue(0);
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
        {/* TODO: {!isSessionActive && (
          <>
            <h3>Break</h3>s
            <div id="time-left">
              {zeroPad(breakDuration.hours)}:{zeroPad(breakDuration.minutes)}:
              {zeroPad(breakDuration.seconds)}
            </div>
          </>
        )} */}
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
