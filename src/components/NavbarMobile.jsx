import React from 'react';
import { Link, NavLink} from 'react-router-dom';
import SearchBar from '../components/navbar/searchBar';
import './NavbarMobile.scss';
import MenuIcon from './navbar/menuIcon'


const NavbarMobile = () => {
    return ( 
        <nav className="navbar-mobile ">
            <div className="navbar-mobile-container d-flex justify-content-between align-items-center">
                <Link className="navbar-logo-mobile" to="/">
                    <h1>QTV Music</h1>
                </Link>
                <div className="navbar-mobile-container-item d-flex justify-content-between align-items-center">
                    <SearchBar /><span></span><MenuIcon />
                </div>
            </div>
        </nav>
     );
}
 
export default NavbarMobile;