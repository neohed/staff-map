import React from 'react';
//import SimpleMap from "./components/SimpleMap";
import ShapesMap from "./components/ShapesMap";
import type {MapStyles} from "./components/types";
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
        <ShapesMap styles={mapProps} />
    </div>
  );
}

export default App;
