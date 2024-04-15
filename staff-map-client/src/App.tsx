import {MapPage} from './features/maps'
import {Login} from "./features/account/"
import {Routes, Route} from 'react-router-dom'
import Menu from './components/Menu';
import Home from "./components/Home";
import {AuthRoute} from "./features/account"
import './App.css';
/*
import ShapesMap from "./components/ShapesMap";
import BicyclingMap from "./components/BicyclingMap";
import DataMap from "./components/DataMap";
import OverlayMap from "./components/OverlayMap";
import TransitMap from "./components/TransitMap";
import SearchMap from "./components/SearchMap";
import SimpleMap from "./components/SimpleMap";
 */

function App() {
    return (
        <div className="App">
            <Menu />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/map" element={
                    <AuthRoute>
                        <MapPage />
                    </AuthRoute>
                }/>
                <Route path="*" element={<div>404</div>}/>
            </Routes>
        </div>
    );
}

export default App;
