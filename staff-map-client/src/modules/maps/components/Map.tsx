import React, {useRef, useCallback, useState} from 'react'
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

type LatLngLiteral = google.maps.LatLngLiteral;
//type DirectionsResult = google.maps.DirectionsResult;
//type MapOptions = google.maps.MapOptions;

type Props = {
    //setReady: (isReady: boolean) => void;
}

function GoogleMapWrapper({}: Props) {
    const mapRef = useRef<google.maps.Map>();
    const [office, setOffice] = useState<LatLngLiteral>({lat: 51.50630583891455, lng: -0.23167620553477958});

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map
    }, []);

    /*
    const updateOffice = (position: LatLngLiteral) => {
        setOffice(position);
        mapRef.current?.panTo(position)
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
