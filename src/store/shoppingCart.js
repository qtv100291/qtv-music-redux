import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import addfunc from '../ultis/additionalFunction';

const slice = createSlice({
    name:"shoppingCart",
    initialState: [],
    reducers: {
        getInitialValue: (shoppingCart,action) => {
            if (action.payload.length > 0) {
                for (let item of action.payload){
                    shoppingCart.push(item);
                }
            }
        },
        cartAddItem: (shoppingCart, action) => {
            for (let i = 0; i < shoppingCart.length; i++){
                if( action.payload.id === shoppingCart[i].id ){
                    const countItem = shoppingCart[i].count + 1; 
                    shoppingCart[i] = {...shoppingCart[i], count : countItem}
                    return;
                }
            }
            shoppingCart.push(action.payload)
        },
        cartPlusItem: (shoppingCart, action) => {
            for (let i = 0; i < shoppingCart.length; i++){
                if( action.payload.id === shoppingCart[i].id ){
                    const countItem = shoppingCart[i].count + 1; 
                    shoppingCart[i] = {...shoppingCart[i], count : countItem}
                    return;
                }
            }
        },
        cartMinusItem: (shoppingCart, action) => {
            for (let i = 0; i < shoppingCart.length; i++){
                if( action.payload.id === shoppingCart[i].id ){
                    const countItem = shoppingCart[i].count - 1; 
                    shoppingCart[i] = {...shoppingCart[i], count : countItem}
                    return;
                }
            }
        },
        cartDeleteItem: (shoppingCart, action) => {
            for (let i = 0; i < shoppingCart.length; i++){
                if( action.payload.id === shoppingCart[i].id ){
                    shoppingCart.splice(i,1);
                    return;
                }
            }
        },
        cartChangeQuantity: (shoppingCart, action) => {
            for (let i = 0; i < shoppingCart.length; i++){
                if( action.payload.id === shoppingCart[i].id ){ 
                    shoppingCart[i] = {...shoppingCart[i], count : action.payload.count}
                    return;
                }
            }
        },
        cartCheckEmpty: (shoppingCart, action) => {
            for (let i = 0; i < shoppingCart.length; i++){
                if( action.payload.id === shoppingCart[i].id ){ 
                    shoppingCart[i] = {...shoppingCart[i], count : 1}
                    return;
                }
            }
        }
    }
})

//actions
export const { cartAddItem, cartMinusItem, cartPlusItem, cartDeleteItem, cartChangeQuantity, cartCheckEmpty, getInitialValue } = slice.actions;

//selector
export const selectShoppingCart = createSelector(
    state => state.shoppingCart,
    shoppingCart => shoppingCart
) 

export const getTotalCountItem = createSelector(
    state => state.shoppingCart,
    shoppingCart => shoppingCart.reduce((acc, item) => {
        const count = item.count || 0;
        return acc + count
    },0)
)

export const getTotalMoney = createSelector (
    state => state.shoppingCart,
    shoppingCart => {
        const itemTotalMoney = shoppingCart.reduce((acc, item) => {
            const count = item.count || 0;
            return acc + count*item.price.replace(/\./g,"")
        },0)
        return addfunc.separator1000(itemTotalMoney)
    }
)
    
//reducer
export default slice.reducer