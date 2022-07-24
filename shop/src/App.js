import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js'
import axios from 'axios';
import Cart from './routes/Cart.js'
import {useQuery} from 'react-query'

function App() {

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify([]))
  }, [])

  let [shoes, setShoes] = useState(data)
  let [btnCnt, setBtnCnt] = useState(0)
  let navigate = useNavigate()

  let result = useQuery('작명', ()=>
     axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{
      return a.data
    })
  )


  return (
    <div className="App">
      
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={()=>{ navigate('/') }}>Football Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
           <div className='main-bg'></div>
           <div>
             <Container>
              <Row>
                 {
                   shoes.map(function (item, i) {
                     return (
                       <Product shoes={shoes} item={item} i={i}></Product>
                     )
                   })
                 }
              </Row>
     
             </Container>
           </div>
           <button onClick={()=>{
              setBtnCnt(btnCnt+1)
              if (btnCnt < 2) {
                axios.get('https://codingapple1.github.io/shop/data' + (btnCnt+2) + '.json')
                .then((res)=>{ setShoes([...shoes,...res.data]) })
              } else {
                alert('더이상 상품이 없습니다.')
              }
           }}>더보기</button>
           </>
        }></Route>
        <Route path='/detail/:id' element={<Detail shoes={shoes}></Detail>}/>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path="*" element={<div>404 not found</div>}></Route>   
      </Routes>
    </div>
  );
}

function Product(props) {
  let navigate = useNavigate()
  return (
      <Col>
        <img src={'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg'} width="80%"
        onClick={()=>{ navigate('/detail/'+ props.i) }}></img>
        <h4>{props.shoes[props.i].title}</h4>
        <p>{props.shoes[props.i].price}</p>
      </Col>

  )
}



export default App;
