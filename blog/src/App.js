import { useState } from 'react';
import './App.css';

function App() {
  // 중괄호 {} 문법을 알아보자
  // class나 id 에도 {}로 해당값을 부여할 수 있다.
  // style도 {}써주 중괄호 안에 객체 {} 형태로 입력해줘야한다.
  // class 부여할때는 className이다.
  let post = '강남 우동 맛집';

  // state 사용법
  // a는 남자 코트 추천 b는 state 변경 도와주는 함수 이름은 자유
  // destructing 문법이 적용된다. ( let [a, b] = [1,2]와 같음)
  // state를 쓰는 이유 : 값이 바뀌면 자동으로 html이 반영된다.
  // 자주 변경될 것 같은 html 부분은 state로 만들어서 사용한다.
  let [lst, titleChange] = useState(['남자 코트 추천','강남 우동 맛집','파이썬 독학']);
  let [cnt, cntChange] = useState(new Array(lst.length).fill(0));
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [inputValue, changeInput] = useState('');
  
  // return 안에 div 태그는 하나만 있어야 한다.
  

  return (
    <div className="App">
      <div className="black-nav">
        <h4 id={ post }>ReactBlog</h4>
      </div>

      <button onClick={()=>{
        let copy = [...lst];
        copy.sort();
        titleChange(copy);
      }}>가나다순 정렬</button>
      {/* <div className='list'>
        state를 변경하려면 state 변경함수를 써야한다.*/}
        {/* 변경함수 안에 새로 대체 될 값을 써준다.
        <h4>{ lst[0] } <span onClick={ () => { cntChange(cnt + 1) } }>👍</span> { cnt } </h4>
        
        <p>2월 17일 발행</p>
      </div> */}
      {/* <div className='list'>
        <h4 onClick={()=>{
          if (modal === true) {
            setModal(false)
          } else {
            setModal(true)
          }
        }}>{ lst[2] }</h4>
        <p>2월 17일 발행</p>
      </div>
      {
        modal == true ? <Modal></Modal> : null
      } */}

    {
      lst.map(function(a,i){
        return (
        <div className='list'>
          <h4 onClick={ ()=>{
            setModal(!modal);
            setTitle(i) 
          }}>{ a } <span onClick={ (e) => { e.stopPropagation();
            let copy = [...cnt];
            copy[i] += 1
            cntChange(copy) } }>👍</span> { cnt[i] } </h4>
          <button onClick={()=>{
            let copy = [...lst]
            copy.splice(i, 1)
            titleChange(copy)
          }}>삭제</button>
          <p>2월 17일 발행</p>
        </div>
        )
      })
    }
    <input onChange={(e)=>{ changeInput(e.target.value)}}></input>
    <button onClick={()=>{
      let copy = [...lst]
      copy.push(inputValue)
      cntChange(new Array(copy.length).fill(0))
      titleChange(copy)
    }}>등록</button>

    {
        modal == true ? <Modal titleChange={titleChange} lst={lst} title={title}></Modal> : null
    }
    </div>
  );
}


// 함수 이름 반드시 대문자로!
function Modal(props) {
  return (
  <div className='modal'>
    <h4>{ props.lst[props.title] }</h4>
    <p>날짜</p>
    <p>상세내용</p>
    <button onClick={()=>{
      let copy = [...props.lst]
      copy[0] = '여자코트 추천'
      props.titleChange(copy)
    }}>글 수정</button>
  </div>
  );
}


export default App;
