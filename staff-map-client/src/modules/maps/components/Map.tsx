import React from 'react'
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
    useJsApiLoader
} from '@react-google-maps/api';
import { center, options, defaultOptions } from './map-options';
import MapLoading from "./MapLoading";
import envVars from "../../../lib/env-vars";
// import type {MapProps} from "./types";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

function GoogleMapWrapper() { // { }: MapProps
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: envVars.GOOGLE_MAPS_API_KEY
    })

    if (!isLoaded) {
        return <MapLoading />
    }

    return (
        <GoogleMap
            mapContainerClassName='map-container'
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
