import React, { useState } from 'react';
import { Link, NavLink} from 'react-router-dom';
import SearchBar from '../components/navbar/searchBar';
import './NavbarMobile.scss';
import MenuIcon from './navbar/menuIcon';
import shoppingCartFunc from '../ultis/shoppingCartFunc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import additionalFunctionDom from '../ultis/additionalFunctionDom';
import { useSelector } from 'react-redux';
import { isLogged, userData } from '../store/authentication';
import { getTotalCountItem } from '../store/shoppingCart';


const NavbarMobile = () => {
    const [isOpening, setIsOpening] = useState(false);

    const isLoggedUser = useSelector(isLogged);
    const { name } = useSelector(userData);
    const itemTotalNumber = useSelector(getTotalCountItem) 

    const handleOpening = () => {
        additionalFunctionDom.fixBody();
        setIsOpening(true);
    }

    const handleClosing = () => {
        additionalFunctionDom.releaseBody();
        setIsOpening(false);
    }

    return ( 
        <nav className="navbar-mobile ">
            <div className="navbar-mobile-container d-flex justify-content-between align-items-center">
                <Link className="navbar-logo-mobile" to="/">
                    <h1>QTV Music</h1>
                </Link>
                <div className="navbar-mobile-container-item d-flex justify-content-between align-items-center">
                    <SearchBar idInput={"search-bar-mobile"}/><span></span><MenuIcon onOpening={handleOpening}/>
                </div>
                <div className={isOpening ? "mobile-navbar-board displaying" : "mobile-navbar-board"} onClick ={handleClosing}>
                    <div className="mobile-navbar-board-content">
                        <div className="mobile-navbar-item log-in">
                            {isLoggedUser ? <Link to="/tai-khoan"><FontAwesomeIcon icon="user" className="icon-nav-mobile"/>Chào {name}</Link> 
                                    : <Link to="/dang-nhap"><FontAwesomeIcon icon="user"className="icon-nav-mobile"/> Đăng Nhập</Link>}
                        </div>
                        <div className="mobile-navbar-item"><Link to="/gio-hang" ><FontAwesomeIcon icon="shopping-bag" className="icon-nav-mobile"/> Giỏ Hàng <span>{itemTotalNumber}</span></Link></div>
                        <div className="mobile-navbar-item"><NavLink exact activeClassName="activeLink" to="/"><FontAwesomeIcon icon="home" className="icon-nav-mobile"/> Trang Chủ</NavLink></div>
                        <div className="mobile-navbar-item"><NavLink exact activeClassName="activeLink" to="/san-pham"><FontAwesomeIcon icon="compact-disc" className="icon-nav-mobile"/> Sản Phẩm</NavLink></div>
                        <div className="mobile-navbar-item"><NavLink exact activeClassName="activeLink" to="/blog"><FontAwesomeIcon icon="bookmark" className="icon-nav-mobile"/> Blog</NavLink></div>
                        <div className="mobile-navbar-item"><NavLink exact activeClassName="activeLink" to="/lien-he"><FontAwesomeIcon icon="phone-alt" className="icon-nav-mobile"/> Liên Hệ</NavLink></div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
 
export default NavbarMobile;