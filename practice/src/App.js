import './App.css';
import React, { useEffect, useState } from 'react';
import Player from './Player';
import { Button } from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  let [isPlay, setIsPlay] = useState(null)

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header className='text-center' as="h3"><strong>듣고싶은 장르 Play 버튼 클릭!</strong></Popover.Header>
      <Popover.Body>
        <p><strong className='genreText'>ooo할때 ooo 하는 테마1<Button onClick={()=>{
          setIsPlay(1)
        }} id='playBtn' size='sm'>Play</Button></strong></p><hr></hr>
        <p><strong className='genreText'>ooo할때 ooo 하는 테마1<Button onClick={()=>{
          setIsPlay(2)
        }} id='playBtn' size='sm'>Play</Button></strong></p><hr></hr>
        <p><strong className='genreText'>ooo할때 ooo 하는 테마1<Button onClick={()=>{
          setIsPlay(3)
        }} id='playBtn' size='sm'>Play</Button></strong></p><hr></hr>
        <p><strong className='genreText'>ooo할때 ooo 하는 테마1<Button onClick={()=>{
          setIsPlay(4)
        }} id='playBtn' size='sm'>Play</Button></strong></p>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="App">
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Button variant="success">음악듣기</Button>
      </OverlayTrigger>
      {
        isPlay ? <Player /> : null
      }

    </div>
  );
}

export default App;


