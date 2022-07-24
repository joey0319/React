import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'




let stock = createSlice({
    name : 'stock',
    initialState : [10,11,12]
})

let bag = createSlice({
    name : 'bag',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],
    reducers : {
        changeBag (state, id) {
            state.forEach((obj)=>{
                if (obj.id == id.payload) {
                    obj.count += 1
                }
            })
        },
        setBag(state, item) {
            state.push(item.payload)
        }
    }
})

export let { changeBag, setBag } = bag.actions
export default configureStore({
  reducer: {
        user : user.reducer,
        stock : stock.reducer,
        bag : bag.reducer
  }
})

