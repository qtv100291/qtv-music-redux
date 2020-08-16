import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuIcon = ({ onOpening }) => {
    return ( 
        <div className="menu-icon-part navbar-icon-item d-flex align-items-center justify-content-center" onClick ={onOpening}>
            <FontAwesomeIcon  icon ="bars" className="real-font-awesome icon-navbar"/>
        </div>
    );
}
 
export default MenuIcon;