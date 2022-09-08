import "./App.css";
import React, { useState } from "react";
import { intervalToDuration } from "date-fns";

const TWENTY_FIVE_MINUTES_MS = 1500000;
const DEFAULT_BREAK_LENGTH_VALUE = 5;
const DEFAULT_SESSION_LENGTH_VALUE = 25;
const BREAK_DECREMENT_ID = "break-decrement";
const BREAK_INCREMENT_ID = "break-increment";
const SESSION_DECREMENT_ID = "session-decrement";
const SESSION_INCREMENT_ID = "session-increment";

const zeroPad = (num) => String(num).padStart(2, "0");

function App() {
  const [breakLengthValue, setBreakLengthValue] = useState(
    DEFAULT_BREAK_LENGTH_VALUE
  );
  const [sessionLengthValue, setSessionLengthValue] = useState(
    DEFAULT_SESSION_LENGTH_VALUE
  );
  const [timeLeftValue, setTimeLeftValue] = useState();

  const sessionDuration = intervalToDuration({
    start: 0,
    end: TWENTY_FIVE_MINUTES_MS,
  });

  const handleResetClick = () => {
    setBreakLengthValue(DEFAULT_BREAK_LENGTH_VALUE);
    setSessionLengthValue(DEFAULT_SESSION_LENGTH_VALUE);
  };

  const handleBreakClick = (event) => {
    const idClicked = event.target.id;

    if (idClicked === BREAK_DECREMENT_ID) {
      setBreakLengthValue(breakLengthValue - 1);
    } else if (idClicked === BREAK_INCREMENT_ID) {
      setBreakLengthValue(breakLengthValue + 1);
    }
  };

  const handleSessionClick = (event) => {
    const idClicked = event.target.id;

    if (idClicked === SESSION_DECREMENT_ID) {
      setSessionLengthValue(sessionLengthValue - 1);
    } else if (idClicked === SESSION_INCREMENT_ID) {
      setSessionLengthValue(sessionLengthValue + 1);
    }
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
        <h3>Session</h3>
        <div id="time-left">
          {zeroPad(sessionDuration.minutes)}:{zeroPad(sessionDuration.seconds)}
        </div>
        <button id="start_stop">Start/Stop</button>
        <button id="reset" onClick={handleResetClick}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
