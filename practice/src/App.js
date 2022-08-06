import './App.css';
import React, { useEffect, useState } from 'react';
import videos from './videos.js'
import { ImPlay3, ImPause2, ImBackward2, ImForward3 } from "react-icons/im";

function App() {
  const videoList = videos
  const [idx, setIdx] = useState(0)
  const [isPlay, setIsPlay] = useState(false)
  useEffect(()=>{
    if (isPlay) {
      document
        .querySelector('#ytVideo')
        .contentWindow.postMessage(
          '{"event":"command","func":"' + 'playVideo' + '","args":""}',
          '*',
        );
    } else {
      document
        .querySelector('#ytVideo')
        .contentWindow.postMessage(
          '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
          '*',
        );
    }
  }, [isPlay])
  const isPlayVideo = () => {
    setIsPlay(!isPlay)
  };

  return (
    <div className="App">
      <iframe
          id='ytVideo'
          width='800px'
          height='500px'
          src={`https://www.youtube.com/embed/${videoList[idx]}?autoplay=1&mute=0&autohide='2'&modestbranding=1&enablejsapi=1&version=3&playerapiid=ytplayer`}
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
      ></iframe>
      <div>
        <ImBackward2 size="24" style={{'margin':'10px'}} onClick={()=>{
          setIdx((idx-1+videoList.length)%videoList.length)
          setIsPlay(true)
        }}></ImBackward2>

        {
          isPlay ? <ImPause2 size="24" style={{'margin':'10px'}} onClick={()=>{
            isPlayVideo()
          }}></ImPause2> :
          <ImPlay3 size="24" style={{'margin':'10px'}} onClick={()=>{
            isPlayVideo()
          }}></ImPlay3>
        }

        <ImForward3 size="24" style={{'margin':'10px'}} onClick={()=>{
          setIdx((idx+1)%videoList.length)
          setIsPlay(true)
        }}></ImForward3>
      </div>
    </div>
  );
}

export default App;


