import React from "react";
import type { MapStyles } from './types';
import Layout from './Layout';
import Map from './Map';

const mapProps: MapStyles = {
    container: {
        width: '100%',
        height: 'calc(100vh - 62px)'
    }
}

const MapPage = () => {
    return (
        <Layout
            main={
                <Map styles={mapProps} />
            }
        />
    )
}

export default MapPage;
