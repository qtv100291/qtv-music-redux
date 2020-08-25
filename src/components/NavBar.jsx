import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ShoppingIcon from './navbar/shoppingIcon';
import SearchBar from './navbar/searchBar';
import LoginIcon from './navbar/logIn';
import AccountIcon from './navbar/account';
import './NavBar.scss';
import { useSelector } from 'react-redux';
import { isLogged, userData } from '../store/authentication';


const NavBar = () => {
    const isLoggedUser = useSelector(isLogged);
    const { name } = useSelector(userData);
    return ( 
        <nav className="navbar-desktop justify-content-between align-items-center">
            <div className="navbar-container d-flex justify-content-between align-items-center">
                <Link className="navbar-logo" to="/">
                    <h1>QTV Music</h1>
                </Link>
                <div className="navbar-page" >
                    <NavLink 
                        exact
                        className="navbar-page-item" 
                        activeClassName="activeLink"
                        to="/">
                            Trang Chủ
                    </NavLink>
                    <NavLink 
                        className="navbar-page-item" 
                        activeClassName="activeLink"
                        to="/san-pham">
                            Sản Phẩm
                    </NavLink>
                    <NavLink 
                        className="navbar-page-item" 
                        activeClassName="activeLink"
                        to="/blog">
                            Blog
                    </NavLink>
                    <NavLink 
                        className="navbar-page-item" 
                        activeClassName="activeLink"
                        to="/lien-he">
                            Liên Hệ
                    </NavLink>
                </div>
                <div className="navbar-icon d-flex">
                    <SearchBar idInput = {"search-bar-desktop"}/>
                    <NavLink 
                        style ={{marginLeft:"25px"}}
                        title = "Giỏ Hàng"
                        to="/gio-hang">
                            <ShoppingIcon />
                    </NavLink>
                    <NavLink 
                        style ={{marginLeft:"25px"}}
                        title = {isLoggedUser ? `Xin chào ${name}` : "Đăng Nhập"}
                        to={isLoggedUser ? "/tai-khoan" : "/dang-nhap"}>
                            {isLoggedUser ? <AccountIcon /> : <LoginIcon/>}
                    </NavLink>
                </div>
                </div>
        </nav>
     );
}

export default NavBar;
