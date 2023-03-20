import React from 'react';
/*
import SimpleMap from "./components/SimpleMap";
import ShapesMap from "./components/ShapesMap";
import BicyclingMap from "./components/BicyclingMap";
import MapData from "./components/MapData";
import OverlayMap from "./components/OverlayMap";
 */
import type {MapStyles} from "./components/types";
import MapTransit from "./components/MapTransit";
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
        <MapTransit styles={mapProps} />
    </div>
  );
}

export default App;
