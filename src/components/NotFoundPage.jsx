import React, { useCallback, useEffect } from 'react';
import brokenGuitar from '../assets/homepage-assets/broken-guitar.png';
import './NotFoundPage.scss'
import { Link } from 'react-router-dom';

const NotFoundPage = () => {

    useEffect( () => {
        document.title = "404 Music";
    })
    return ( 
        <main className="not-found-main">
            <div className="not-found-container d-flex justify-content-center align-items-center">
                <div className="not-found-photo">
                    <img src={brokenGuitar} alt="broken-guitar"/>
                </div>
                <div className="not-found-messenger">
                    <h2>404 MUSIC NOT FOUND</h2>
                    <p>Không Có Tí Nhạc Nhẽo Nào Ở Đây Cả Đâu ...</p>
                    <Link to="/"><div className="button-homepage">Quay Lại Trang Chủ</div></Link>
                </div>
            </div>
        </main>
     );
}
 
export default NotFoundPage;