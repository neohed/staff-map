import React from 'react';
/*
import ShapesMap from "./components/ShapesMap";
import BicyclingMap from "./components/BicyclingMap";
import DataMap from "./components/DataMap";
import OverlayMap from "./components/OverlayMap";
import TransitMap from "./components/TransitMap";
import SearchMap from "./components/SearchMap";
import SimpleMap from "./components/SimpleMap";
 */
import {Map} from './modules/maps'
import type {MapStyles} from "./components/types";
import {Login} from "./modules/account";
import {Routes, Route, Link} from 'react-router-dom'
import Home from "./components/Home";
import {AuthRoute} from "./modules/account"
import './App.css';

const mapProps: MapStyles = {
    container: {
        width: '1200px',
        height: '800px'
    }
}

function App() {
    return (
        <div className="App">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/map">Map</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/map" element={
                    <AuthRoute>
                        <Map styles={mapProps}/>
                    </AuthRoute>
                }/>
                <Route path="*" element={<div>404</div>}/>
            </Routes>
        </div>
    );
}

export default App;
