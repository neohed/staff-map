import React from "react";
import {NavLink} from 'react-router-dom'
import {useAuth} from '../modules/account';
import "./Menu.css"

const Menu = () => {
    const isAuthenticated = useAuth();

    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/map">Map</NavLink></li>
                {
                    !isAuthenticated && <li><NavLink to="/login">Login</NavLink></li>
                }
            </ul>
        </nav>
    )
}

export default Menu
