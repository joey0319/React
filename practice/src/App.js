import './App.css';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import 'bootstrap/dist/css/bootstrap.min.css';
import songs from './songs.js'
import { ImPlay3, ImPause2, ImBackward2, ImForward3 } from "react-icons/im";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {
  let [genre, setGenre] = useState(null)

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header className='text-center' as="h3"><strong>듣고싶은 장르 클릭!</strong></Popover.Header>
      <Popover.Body>
        {/* <p><strong className='genreText'>힙합<Button onClick={()=>{
          setGenre('hiphop')
        }} id='playBtn' size='sm'>Play</Button></strong></p><hr></hr>

        <p><strong className='genreText'>싸이월드<Button onClick={()=>{
          setGenre('cyworld')
        }} id='playBtn' size='sm'>Play</Button></strong></p><hr></hr>

        <p><strong className='genreText'>생일축하<Button onClick={()=>{
          setGenre('birthday')
        }} id='playBtn' size='sm'>Play</Button></strong></p><hr></hr>

        <p><strong className='genreText'>인디음악<Button onClick={()=>{
          setGenre('independent')
        }} id='playBtn' size='sm'>Play</Button></strong></p><hr></hr>

        <p><strong className='genreText'>댄스음악<Button onClick={()=>{
          setGenre('dance')
        }} id='playBtn' size='sm'>Play</Button></strong></p><hr></hr>

        <p><strong className='genreText'>재즈<Button onClick={()=>{
          setGenre('jazz')
        }} id='playBtn' size='sm'>Play</Button></strong></p> */}
        <Container>
          <Row>
            <Col className='lb-wrap'>
              <div className='lb-text'>
              <p>Hiphop</p>
              </div>
              <div className='lb-image'>
                <img onClick={()=>{
                  setGenre('hiphop')
                }} src='/hiphop.jpg'></img>
              </div>
            </Col>
            <Col className='lb-wrap'>
            <div className='lb-text'>
              <p>Cyworld</p>
            </div>
            <div className='lb-image'>
              <img onClick={()=>{
          setGenre('cyworld')
        }} src='/hiphop.jpg'></img>
            </div>
            </Col>
          </Row>
          <Row>
            <Col className='lb-wrap'>
            <div className='lb-text'>
              <p>Birthday</p>
            </div>
            <div className='lb-image'>
              <img onClick={()=>{
          setGenre('birthday')
        }} src='/hiphop.jpg'></img>
            </div>
            </Col>
            <Col className='lb-wrap'>
            <div className='lb-text'>
              <p>Indie</p>
            </div>
            <div className='lb-image'>
              <img onClick={()=>{
          setGenre('independent')
        }} src='/hiphop.jpg'></img>
            </div>
            </Col>
          </Row>
          <Row>
            <Col className='lb-wrap'>
            <div className='lb-text'>
              <p>Dance</p>
            </div>
            <div className='lb-image'>
              <img onClick={()=>{
          setGenre('dance')
        }} src='/hiphop.jpg'></img>
            </div>
            </Col>
            <Col className='lb-wrap'>
            <div className='lb-text'>
              <p>Jazz</p>
            </div>
            <div className='lb-image'>
              <img onClick={()=>{
          setGenre('jazz')
        }} src='/hiphop.jpg'></img>
            </div>
            </Col>
          </Row>
        </Container>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="App">
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Button variant="success">음악듣기</Button>
      </OverlayTrigger>
      {
        genre ? <Player genre={genre}/> : null
      }

    </div>
  );
}

function Player(props) {
  const videoList = songs[props.genre]
  const [idx, setIdx] = useState(0)
  const [isPlay, setIsPlay] = useState(true)
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
    <div className="Player">
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
        <ImBackward2 className='Btn' size="24" style={{'margin':'10px'}} onClick={()=>{
          setIdx((idx-1+videoList.length)%videoList.length)
          setIsPlay(true)
        }}></ImBackward2>

        {
          isPlay ? <ImPause2 className='Btn' size="24" style={{'margin':'10px'}} onClick={()=>{
            isPlayVideo()
          }}></ImPause2> :
          <ImPlay3 size="24" className='Btn' style={{'margin':'10px'}} onClick={()=>{
            isPlayVideo()
          }}></ImPlay3>
        }

        <ImForward3 className='Btn' size="24" style={{'margin':'10px'}} onClick={()=>{
          setIdx((idx+1)%videoList.length)
          setIsPlay(true)
        }}></ImForward3>
      </div>
    </div>
  );
}

export default App;


