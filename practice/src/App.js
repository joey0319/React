import './App.css';
import React, { useEffect, useState } from 'react';
import videos from './videos.js'

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
        <button style={{'margin':'10px'}} onClick={()=>{
          setIdx((idx-1+videoList.length)%videoList.length)
          setIsPlay(true)
        }}>이전곡</button>
        {       
          <button onClick={()=>{
            isPlayVideo()
          }}>{isPlay ? "정지" : "재생"}</button>
        }       
        <button style={{'margin':'10px'}} onClick={()=>{
          setIdx((idx+1)%videoList.length)
          setIsPlay(true)
        }}>다음곡</button>
      </div>
    </div>
  );
}

export default App;


