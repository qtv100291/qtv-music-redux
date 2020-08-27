import React, { useEffect } from 'react';
import ShoppingCartItem from '../components/shoppingcart/shoppingCartItem';
import addfunc from '../ultis/additionalFunction';
import './ShoppingCart.scss';
import { Link } from 'react-router-dom';
import additionalFunctionDom from '../ultis/additionalFunctionDom';
import { useSelector } from 'react-redux';
import { selectShoppingCart, getTotalCountItem, getTotalMoney } from '../store/shoppingCart';

const ShoppingCart = ({ onOpenLoadingScreen, onCloseLoadingScreen }) => {
                            
    const shoppingCart = useSelector(selectShoppingCart);
    const itemTotalNumber = useSelector(getTotalCountItem);
    const moneyTotalNumber = useSelector(getTotalMoney);
    
    useEffect(() => {
        document.title = "Giỏ Hàng";
        window.scrollTo(0, 0);
        onOpenLoadingScreen();
        additionalFunctionDom.fixBody();
        setTimeout( () => {
            onCloseLoadingScreen();
            additionalFunctionDom.releaseBody();
        },700)
    },[])
    if (!shoppingCart) return null
    else
    return ( 
        <main className="shopping-cart-main">
            <h2 className="shopping-cart-title">Giỏ Hàng <span>( {itemTotalNumber} sản phẩm )</span></h2>
            <div className="shopping-cart-container d-flex justify-content-between">
                <section className="list-item-section">
                    {(shoppingCart.length === 0) ?
                    <h3>Chưa Có Sản Phẩm</h3>
                    : shoppingCart.map( item => <ShoppingCartItem
                                                    key={item.id} {...item}
                                                />)}
                </section>
                <section className="total-money">
                    <div className="total-money-container">
                        <p className="total-money-title d-flex justify-content-between">Tạm Tính<span>{addfunc.separator1000( moneyTotalNumber) } VND</span></p>
                        <p className="total-money-tax d-flex justify-content-between">Thuế VAT <span>{ addfunc.separator1000(moneyTotalNumber/10) } VND</span></p> 
                        <p className="total-money-value d-flex justify-content-between align-items-center">TỔNG<span>{ addfunc.separator1000((moneyTotalNumber*1.1).toFixed(0))} VND</span></p> 
                    </div>
                    {(shoppingCart.length !== 0) && <Link to="thanh-toan"><div className="payout-button d-flex align-items-center justify-content-center">THANH TOÁN</div></Link>}
                </section>
            </div>
        </main>
    )
}

export default ShoppingCart;

