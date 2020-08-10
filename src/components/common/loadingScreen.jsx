import React from 'react';
import loadingIcon from '../../assets/homepage-assets/loading-icon.gif';
import './loadingScreen.scss'

const LoadingScreen = ({ isLoadingScreen }) => {
    return ( 
        <div className={isLoadingScreen ? "loading-screen" : "loading-screen turn-off"}>
            <img src={loadingIcon} alt="loading icon"/>
        </div>
    );
}
 
export default LoadingScreen;