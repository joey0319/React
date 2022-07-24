import {Table} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {changeAge } from './../store/userSlice.js'
import { changeBag } from './../store.js'

function Cart() {

    let user = useSelector((state)=>{return state.user})
    let bag = useSelector((state)=>state.bag)
    let dispatch = useDispatch()
    return (
        <div>
            <h1>{user.name} {user.age}의 장바구니</h1>
            <button onClick={()=>{dispatch(changeAge(10))}}>버튼</button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bag.map((a, i)=>{
                            return (
                                <tr>
                                <td>{a.id}</td>
                                <td>{a.name}</td>
                                <td>{a.count}</td>
                                <td>
                                    <button onClick={()=>{
                                        dispatch(changeBag(a.id))
                                    }}>+</button>
                                </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart