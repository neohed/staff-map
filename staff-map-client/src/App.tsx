import React from 'react';
/*
import SimpleMap from "./components/SimpleMap";
import ShapesMap from "./components/ShapesMap";
import BicyclingMap from "./components/BicyclingMap";
import DataMap from "./components/DataMap";
import OverlayMap from "./components/OverlayMap";
import TransitMap from "./components/TransitMap";
 */
import type {MapStyles} from "./components/types";
import SearchMap from "./components/SearchMap";
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
        <SearchMap styles={mapProps} />
    </div>
  );
}

export default App;
