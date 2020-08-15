import React, { useEffect } from 'react';
import Avatar from '../assets/homepage-assets/manager.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserInformation from '../components/account/userInformation';
import UserTradeHistory from '../components/account/userTradeHistory';
import additionalFunctionDom from '../ultis/additionalFunctionDom';
import './Account.scss'
import { useState } from 'react';

const Account = ({onOpenLoadingScreen, onCloseLoadingScreen, userData, onUpdateUser}) => {
    const [activeTab, setActiveTab] = useState(1);
    useEffect(()=>{
        document.title = "Tài Khoản";
        window.scrollTo(0, 0);
        onOpenLoadingScreen();
        additionalFunctionDom.fixBody();
        setTimeout( () => {
            onCloseLoadingScreen();
            additionalFunctionDom.releaseBody();
        },500) 
    },[])

    const handleChangeTab = id => {
        if (id === activeTab) return 
        else setActiveTab(id)
    }

    const handleLogOut = () => {
        localStorage.removeItem("token");
        window.location = "/";
    }

    if (!userData) return null;
    else
    return ( 
        <main className="account-main">
            <div className="account-container d-flex justify-content-between">
                <section className="account-side-bar">
                    <div className="account-menu-member-general d-flex align-items-center">
                        <img src={Avatar} alt="avatar"/>
                        <div className="welcome-member">Xin Chào
                            <strong className="member-name" title={userData.name}> {userData.name}</strong>
                        </div>
                    </div>
                    <ul className="account-menu-sidebar">
                        <li className= {activeTab === 1 ? "account-menu-info active-menu" : "account-menu-info"} onClick = {() => handleChangeTab(1)}>
                            <FontAwesomeIcon icon="user-alt"/>
                            Thông Tin Tài Khoản
                        </li>
                        <li className={activeTab ===  2 ? "account-menu-history-trade active-menu" : "account-menu-history-trade"} onClick = {() => handleChangeTab(2)}>
                            <FontAwesomeIcon icon ="bookmark"/>
                            Lịch Sử Giao Dịch
                        </li>
                    </ul>
                    <div className="log-out-button" onClick={handleLogOut}>Đăng Xuất</div>
                </section>
                <section className="account-content">
                    {activeTab === 1 ? <UserInformation userData ={userData} onUpdateUser ={onUpdateUser} /> 
                                        : <UserTradeHistory tradeHistory = {userData.tradeHistory}/>}
                </section>
            </div>
        </main>
    );
}

export default Account;