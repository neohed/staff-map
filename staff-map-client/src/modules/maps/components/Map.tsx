import React from 'react'
import type {MapProps} from "./types";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MapLoading from "./MapLoading";
import envVars from "../../../lib/env-vars";

const center = {
    lat: 51.50052933987512,
    lng: -0.12615771706025705
};

const options = {
    streetViewControl: false,
}

function GoogleMapWrapper({ styles }: MapProps) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: envVars.GOOGLE_MAPS_API_KEY
    })

    if (!isLoaded) {
        return <MapLoading />
    }

    return (
        <GoogleMap
            mapContainerStyle={styles.container}
            center={center}
            zoom={10}
            options={options}
            onLoad={m => console.log(m)}
        >
            <></>
        </GoogleMap>
    )
}

const Map = React.memo(GoogleMapWrapper)

export default Map
