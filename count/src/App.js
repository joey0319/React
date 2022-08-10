import React, { useRef, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./App.css";

const RenderTime = ({ remainingTime }) => {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1);
    }, 20);
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper">

      <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
        {remainingTime ? remainingTime : null}
      </div>
      {prevTime.current !== null && (
        <div
          key={prevTime.current}
          className={`time ${!isTimeUp ? "down" : ""}`}
        >
          {prevTime.current}
        </div>
      )}
    </div>
  );
};

function App() {
  let [shot, setShot] = useState(false)

  return (
    <div className="App">
      <button onClick={()=>{
        setShot(true)
        console.log(shot)
      }}>take photo</button>
      {
        shot ? <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={100}
          colors={["#004777"]}
          trailStrokeWidth={0}
          strokeWidth={0}
          onComplete={()=>{
            // 사진찍는 함수 삽입
            setShot(false)
            console.log('종료')
            
          }}
        > 
          {RenderTime}
        </CountdownCircleTimer>
      </div> : null
      }
    </div>
  );
}

export default App;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
