import React, { Component } from 'react';
import './shoppingCartItem.scss';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import addfunc from '../../ultis/additionalFunction';
import { useDispatch } from 'react-redux';
import shoppingCartFunc from '../../ultis/shoppingCartFunc';
import {  cartMinusItem, cartPlusItem, cartDeleteItem, cartChangeQuantity, cartCheckEmpty  } from '../../store/shoppingCart';


const ShoppingCartItem = ({id, name, count, image, price, bandName}) => {
    const productPath = '/san-pham/' + (name && name.replace(/ /g, "-")) + '-' +id;
    const dispatch = useDispatch();

    const minusQuantity = () => {
        if ( count === 1) return
        dispatch(cartMinusItem({id}));
        shoppingCartFunc.saveShoppingCart()
    }

    const plusQuantity = () => {
        if ( count === 99 ) return
        dispatch(cartPlusItem({id}));
        shoppingCartFunc.saveShoppingCart()
    }

    const deleteItem = () => {
        dispatch(cartDeleteItem({id}));
        shoppingCartFunc.saveShoppingCart()
    }

    const changeQuantity = ({currentTarget : input}) => {
        const value = addfunc.checkOnly2Digit(input.value);
        dispatch(cartChangeQuantity({
            id,
            count: value
        }))
        shoppingCartFunc.saveShoppingCart()
    }

    const checkEmpty = ({currentTarget : input}) => {
        if ( input.value !== "") return 
        else dispatch(cartCheckEmpty({ id }))
        shoppingCartFunc.saveShoppingCart()
    }

    const removeSomeCharacter = event  => {// not allow to press button e, + , -, . on keyboard
        const invalidKey = [69,187,189,190]
        if ( invalidKey.includes(event.keyCode)){
          event.preventDefault()
        }
    }

    return ( 
        <div className="shopping-cart-item d-flex justify-content-center">
            <div className="item-photo">
                <div className="item-photo-container">
                    <img src={image} alt={name}/>
                </div>
            </div>
            <div className="item-info d-flex justify-content-between">
                <div className="item-info-container">
                    <Link to ={productPath}><h3 className="album-name">{name}</h3></Link>
                    <h3 className="band-name">{bandName}</h3>
                    <h3 className="album-price">{price} VND</h3>
                    <div className="delete-button d-flex align-items-center" onClick ={deleteItem}>
                        <FontAwesomeIcon icon = "trash" className="real-font-awesome"/>
                        Xóa
                    </div>
                </div>
                <div className="item-quantity d-flex align-items-center">
                    <div className="minus-button button-quantity d-flex justify-content-center align-items-center" onClick={minusQuantity}>
                        <FontAwesomeIcon icon = "minus" className="real-font-awesome" />
                    </div>
                    <input 
                        type="text" value={count} 
                        onChange={changeQuantity}
                        onBlur = {checkEmpty}
                        onKeyDown = {removeSomeCharacter} 
                    />
                    <div className="plus-button button-quantity d-flex justify-content-center align-items-center" onClick={plusQuantity}>
                        <FontAwesomeIcon icon = "plus" className="real-font-awesome" />
                    </div>
                </div>
                <div className="item-total-money d-flex justify-content-center align-items-center flex-column">
                    <h3 className="item-total-money-title">Thành Tiền:</h3>
                    <h3><strong>{addfunc.separator1000(price.replace(/\D/g,"")*count)} VND</strong></h3>
                </div>
            </div>
        </div>
    );
}
 
export default ShoppingCartItem;