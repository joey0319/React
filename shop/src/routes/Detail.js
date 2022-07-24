import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import '../App.css'
import { useSelector, useDispatch } from 'react-redux'
import {setBag} from './../store.js'

function Detail(props) {
  let { id } = useParams()
  let item = props.shoes.find((x)=> x.id === Number(id))

  useEffect(()=>{
    let watched = localStorage.getItem('watched')
    watched = JSON.parse(watched)
    watched.push(item.id)
    localStorage.setItem('watched', JSON.stringify(watched))
  }, [])

  let bag = useSelector((state)=>{ return state.bag})
  let dispatch = useDispatch()
  let a = useEffect(()=>{
    setTimeout(()=>{setShow(false)}, 2000)
    return ()=>{
      clearTimeout(a)
    }
  })
  let [input, setInput] = useState('')
  useEffect(()=>{
    if (isNaN(input) == true) {
      alert('그러지 마세요')
    }
  }, [input])


  let [show, setShow] = useState(true)
  let [count, setCount] = useState(0)
  let [tap, setTap] = useState(0)


 return (
<div className={"container"}>
  {
    show == true ? <Alert></Alert> : null
  }
  <input onChange={(e)=>{setInput(e.target.value)}}></input>
  <br></br>
  <button onClick={()=>{setCount(count+1)}}>업데이트</button>
  <div className="row">
    <div className="col-md-6">
      <img src={'https://codingapple1.github.io/shop/shoes' + (Number(item.id)+1) + '.jpg'} width="100%" />
    </div>
    <div className="col-md-6">
      <h4 className="pt-5">{item.title}</h4>
      <p>{item.content}</p>
      <p>{item.price}원</p>
      <button className="btn btn-danger" onClick={()=> {
        dispatch(setBag({id: 3, name : item.title, count: 4}))
      }}>주문하기</button> 
    </div>
  </div>
  <Nav variant="tabs" defaultActiveKey="link0">
  <Nav.Item>
    <Nav.Link eventKey="link0" onClick={()=>{setTap(0)}}>버튼0</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link1" onClick={()=>{setTap(1)}}>버튼1</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link2" onClick={()=>{setTap(2)}}>버튼2</Nav.Link>
  </Nav.Item>
</Nav>
<TapContent tap={tap} shoes={props.shoes}></TapContent>
</div> 
 )   
}

function TapContent ({tap, shoes}) {
  return (<div>
    { [<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][tap] }
  </div>)
}


function Alert () {
  return (
      <div className='alert alert-warning'>
        2초 이내 구매 시 할인
      </div>
  )
}



export default Detail