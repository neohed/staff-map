import React from 'react'
import type {MapProps} from "./types";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MapLoading from "./MapLoading";
import envVars from "../lib/env-vars";

const center = {
    lat: 51.50052933987512,
    lng: -0.12615771706025705
};

const options = {
    streetViewControl: false,
}

function MyComponent({ styles }: MapProps) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: envVars.GOOGLE_MAPS_API_KEY
    })

    /*
    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
     */

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
            { /*
               * onUnmount={onUnmount}
               * Child components, such as markers, info windows, etc.
               *
               */ }
            <></>
        </GoogleMap>
    )
}

export default React.memo(MyComponent)
