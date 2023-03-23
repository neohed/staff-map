import React from "react";
import {NavLink} from 'react-router-dom'
import "./Menu.css"

const Menu = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/map">Map</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
            </ul>
        </nav>
    )
}

export default Menu