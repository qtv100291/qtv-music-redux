import React, { useEffect, useRef } from 'react';
// import Avatar from '../assets/homepage-assets/manager.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserInformation from '../components/account/userInformation';
import UserTradeHistory from '../components/account/userTradeHistory';
import additionalFunctionDom from '../ultis/additionalFunctionDom';
import './Account.scss'
import { useState } from 'react';
import storageRef from '../services/firebaseStorage';

const Account = ({onOpenLoadingScreen, onCloseLoadingScreen, userData, onUpdateUser, onUpdateAvatar}) => {
    const [activeTab, setActiveTab] = useState(1);
    useEffect(()=>{
        document.title = "Tài Khoản";
        window.scrollTo(0, 0);
        onOpenLoadingScreen();
        additionalFunctionDom.fixBody();
        setTimeout( () => {
            onCloseLoadingScreen();
            additionalFunctionDom.releaseBody();
        },1200) 
    },[])

    const handleChangeTab = id => {
        if (id === activeTab) return 
        else setActiveTab(id)
    }

    const handleLogOut = () => {
        localStorage.removeItem("token");
        window.location = "/";
    }

    const uploadAvatarToServer = async ({ currentTarget : input }) => {
        const userAvatarFolderRef = storageRef.child('userAvatar');
        const userAvatarRef = userAvatarFolderRef.child(`${userData.id}-avatar`)
        userAvatarRef.delete();
        const file = input.files[0];
        await userAvatarRef.put(file);
        let urlAvatar;
        await userAvatarRef.getDownloadURL().then(url => urlAvatar = url);
        onUpdateAvatar(urlAvatar);
    }

    const inputButton = useRef();

    const uploadImageFile = () => {
        inputButton.current.click();
    }

    if (!userData) return null;
    else
    return( 
        <main className="account-main">
            <div className="account-container d-flex justify-content-between">
                <section className="account-side-bar">
                    <div className="account-menu-member-general d-flex align-items-center">
                        <div className="avatar-container">
                            <div className="avatar-picture d-flex align-items-center justify-content-center" onClick={uploadImageFile}>
                                {userData.avatar ? <img src={userData.avatar} alt="avatar"/> : <FontAwesomeIcon icon="plus"/>}
                            </div>
                            <input type="file" id="upload-image" accept="image/*" ref={inputButton} onChange = {uploadAvatarToServer}/>
                        </div>
                        
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