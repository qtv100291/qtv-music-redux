import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserInformation from '../components/account/userInformation';
import UserTradeHistory from '../components/account/userTradeHistory';
import additionalFunctionDom from '../ultis/additionalFunctionDom';
import './Account.scss';
import { useState } from 'react';
import storageRef from '../services/firebaseStorage';
import {  userData, updateAvatar } from '../store/authentication';
import { useSelector, useDispatch } from 'react-redux';
import updateUser from '../services/updateService';

const Account = ({onOpenLoadingScreen, onCloseLoadingScreen}) => {
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

    const dispatch = useDispatch();

    const { name, avatar, id } = useSelector(userData);

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
        const userAvatarRef = userAvatarFolderRef.child(`${id}-avatar`)
        if (avatar) userAvatarRef.delete();
        const file = input.files[0];
        await userAvatarRef.put(file);
        let urlAvatar;
        await userAvatarRef.getDownloadURL().then(url => urlAvatar = url);
        dispatch(updateAvatar(urlAvatar));
        updateUser();
    }

    const inputButton = useRef();

    const uploadImageFile = () => {
        inputButton.current.click();
    }

    return( 
        <main className="account-main">
            <div className="account-container d-flex justify-content-between">
                <section className="account-side-bar">
                    <div className="account-menu-member-general d-flex align-items-center">
                        <div className="avatar-container">
                            <div className="avatar-picture d-flex align-items-center justify-content-center" onClick={uploadImageFile}>
                                {avatar ? <img src={avatar} alt="avatar"/> : <FontAwesomeIcon icon="plus"/>}
                            </div>
                            <input type="file" id="upload-image" accept="image/*" ref={inputButton} onChange = {uploadAvatarToServer}/>
                        </div>
                        
                        <div className="welcome-member">Xin Chào
                            <strong className="member-name" title={name}> {name}</strong>
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
                    {activeTab === 1 ? <UserInformation /> : <UserTradeHistory />}
                </section>
            </div>
        </main>
    );
}

export default Account;