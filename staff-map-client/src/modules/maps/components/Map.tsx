import React, {useRef, useCallback, useState, useEffect} from 'react'
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
    useJsApiLoader,
} from '@react-google-maps/api';
import { center, mapOptions, defaultOptions } from './map-options';
import MapLoading from "./MapLoading";
import envVars from "../../../lib/env-vars";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

type Props = {
    setReady: (isReady: boolean) => void;
}

function GoogleMapWrapper({setReady}: Props) {
    const mapRef = useRef<google.maps.Map>();
    const [office, setOffice] = useState<LatLngLiteral>({lat: 51.50630583891455, lng: -0.23167620553477958});
    /*
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: envVars.GOOGLE_MAPS_API_KEY,
        libraries: []
    })
     */
    /*
    useEffect(() => {
        setReady(isLoaded)
    }, [setReady, isLoaded])
     */

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map
    }, []);

    const updateOffice = (position: LatLngLiteral) => {
        setOffice(position);
        mapRef.current?.panTo(position)
    }
/*
    if (!isLoaded) {
        return <MapLoading />
    }
 */

    return (
        <GoogleMap
            mapContainerClassName='map-container'
            center={center}
            zoom={10}
            options={mapOptions}
            onLoad={onLoad}
        >
            {
                office && <Marker position={office} />
            }
        </GoogleMap>
    )
}

const Map = React.memo(GoogleMapWrapper)

export default Map
