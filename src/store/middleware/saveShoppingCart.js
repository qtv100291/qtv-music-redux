import { act } from "@testing-library/react";
import shoppingCartFunc from '../../ultis/shoppingCartFunc';
import store from "../configureStore";


const saveShoppingCart = store => next => action => {
    const actionTypeShoppingCart = ["shoppingCart/cartAddItem","shoppingCart/cartPlusItem","shoppingCart/cartMinusItem","shoppingCart/cartDeleteItem", "shoppingCart/cartChangeQuantity", "shoppingCart/cartCheckEmpty","shoppingCart/removeAllItem"]
    next(action);
    if ( actionTypeShoppingCart.includes(action.type) ){
        shoppingCartFunc.saveShoppingCart();
    }
}

export default saveShoppingCart;