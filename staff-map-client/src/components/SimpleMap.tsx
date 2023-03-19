import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '1200px',
    height: '800px'
};

const center = {
    lat: 51.50052933987512,
    lng: -0.12615771706025705
};

function MyComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDYtz7RHNR73l9UljUpzRE2vFdCMXJvTeA"
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

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={m => console.log(m)}
        >
            { /*
               * onUnmount={onUnmount}
               * Child components, such as markers, info windows, etc.
               *
               */ }
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent)
