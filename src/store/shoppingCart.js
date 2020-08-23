import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name:"shoppingCart",
    initialState: [],
    reducers: {
        cartAddItem: (shoppingCart, action) => {
            for (let item of shoppingCart){
                if( action.payload.id === item.id ) {
                    item.count += action.payload.count;
                    return;
                }
            }
            shoppingCart.push(action.payload)
        },
        cartPlusItem : (shoppingCart, action) => {
            for(let item of shoppingCart){
                if( action.payload.id === item.id ) {
                    item.count += 1;
                    break;
                }
            }
        },
        cartMinusItem : (shoppingCart, action) => {
            for(let item of shoppingCart){
                if( action.payload.id === item.id ) {
                    item.count -= 1;
                    break;
                }
            }
        }
    }
})

export const { cartAddItem, cartMinusItem, cartPlusItem } = slice.actions;
export default slice.reducer