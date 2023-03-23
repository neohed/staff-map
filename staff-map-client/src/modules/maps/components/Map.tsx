import React, {useRef, useCallback, useState, useEffect} from 'react'
import {
    GoogleMap,
    Marker,
    /*
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
     */
} from '@react-google-maps/api';
import { center, mapOptions } from './map-options';
import type {MapDataState} from './MapPage';

type LatLngLiteral = google.maps.LatLngLiteral;
//type DirectionsResult = google.maps.DirectionsResult;
//type MapOptions = google.maps.MapOptions;

type Props = {
    mapDataState: MapDataState;
}

function GoogleMapWrapper({mapDataState}: Props) {
    const mapRef = useRef<google.maps.Map>();
    const [office, setOffice] = useState<LatLngLiteral>({lat: 51.50630583891455, lng: -0.23167620553477958});

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map
    }, []);

    const updateOffice = useCallback((position: LatLngLiteral) => {
        setOffice(position);
        mapRef.current?.panTo(position)
    }, []);

    const {office: newOffice} = mapDataState;
    useEffect(() => {
        if (newOffice !== undefined) {
            updateOffice(newOffice)
        }
    }, [newOffice])

    return (
        <GoogleMap
            mapContainerClassName='map-container'
            center={center}
            zoom={10}
            options={mapOptions}
            onLoad={onLoad}
        >
            {
                office && <Marker position={office} icon={'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'} />
            }
        </GoogleMap>
    )
}

/*
 * https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png
 */
const Map = React.memo(GoogleMapWrapper)

export default Map
