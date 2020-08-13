import React from 'react';
import addfunc from '../../ultis/additionalFunction';
import './userTradeHistory.scss';

const userTradeHisotry = ({tradeHistory}) => {
    return ( 
        <div className="trade-history">
            <h2>LỊCH SỬ GIAO DỊCH</h2>
            <div className ="trade-history-container">
                {tradeHistory.length === 0 ? <h3>Chưa Thực Hiện Giao Dịch</h3> : (
                    <ul className="trade-history-list">
                        {tradeHistory.map((item,index) => (
                            <li className="trade-history-item" key={index}>
                                <h3>{item.name}</h3>
                                <p>Số lượng: {item.count}</p>
                                <p>Ngày đặt hàng: {item.time}</p>
                                <p>Tổng tiền: {addfunc.separator1000(item.price.replace(/\./g,"")*item.count)} VND</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
 
export default userTradeHisotry;