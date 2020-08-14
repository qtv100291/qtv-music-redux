import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuIcon = () => {
    return ( 
        <div className="menu-icon-part navbar-icon-item d-flex align-items-center justify-content-center">
            <FontAwesomeIcon  icon ="bars" className="real-font-awesome icon-navbar"/>
        </div>
    );
}
 
export default MenuIcon;