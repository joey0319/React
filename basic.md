### 1. html에 class 넣을때는 className

```react
function App(){
  return (
    <div className="App">
      <div className="black-nav">
        <h4>리액트 연습</h4>
      </div>
    </div>
  )
}
```

### 2. 정의된 변수를 html에 넣고 싶을 때는 중괄호 {}

```react
function App(){

  let title = '리액트 연습중';
  return (
    <div className="App">
      <div className="black-nav">
        <div>{ title }</div>
      </div>
    </div>
  )
}
```

### 3. html에 인라인 스타일 부여하고 싶으면 style={ { } }

```react
<div style={ {color : 'blue', fontSize : '30px'} }> 스타일변경 </div>
```

### 4. 원시값 state 정의 및 변경 방법

#### 📢 state쓰는 이유 : state자료가 변경되면 state가 포함된 html을 자동으로 재랜더링 해준다.

#### 📢 setCnt(갈아 끼울값)

```react
import { useState } from 'react';
import './App.css'

function App(){
  
  let [ cnt, setCnt ] = useState(0);
  return (
      <h4> <span onClick={ ()=>{ setCnt(cnt + 1) } } >👍</span> { cnt }</h4>
  )
}
```

### 5. 객체값 state 변경방법

#### 📢 복사본을 만들고 그것을 변경시키는 것이 좋다.

#### 📢 복사본은 반드시 spread operator로 복사한다. (let copy = [...lst])

```react
function App(){
  
  let [title, setTitle] = useState( ['한국', '중국', '일본'] );  
  
  return (
    <button onClick={ ()=>{ 
      let copy = [...title];
      copy.sort();
      setTitle(copy)
    } }> 정렬버튼 </button>
  )
}
```

### 6. component 생성법

#### 📢 첫글자는 영어대문자로 작명

#### 📢 function 내부에서 만들면 안됨!

```react
function App (){
  return (
    <div>
      <Modal></Modal>
    </div>
  )
}

function Modal(){
  return (
    <div className="modal">
      <h4>모달창</h4>
      <p>모달창입니다.</p>
      <p>모달창이요</p>
    </div>
  )
}
```

### 7. 버튼으로 UI가 보일지 말지 조절하기

#### 📢 삼항연산자 사용

```react
function App (){

  let [modal, setModal] = useState(false);
  return (
    <div>
      (생략)
      <button onClick={ ()=>{ setModal(true) } }></button>
      { 
         modal == true ? <Modal></Modal> : null
      }
    </div>
  )
}

function Modal(){
  return (
    <div className="modal">
      <h4>모달창</h4>
      <p>모달창입니다.</p>
      <p>모달창이요</p>
    </div>
  )
}
```

