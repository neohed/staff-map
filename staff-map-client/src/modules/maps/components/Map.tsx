import React, { useRef, useCallback, useEffect } from 'react'
import type { FC } from 'react'
import type { MapDataState } from './MapPage';
import type { DropItem } from './Toolbox';
import {
    GoogleMap,
    MarkerF,
} from '@react-google-maps/api';
import { useDrop } from 'react-dnd'
import { center, mapOptions } from './map-options';
import { PlaceTypes } from './types';
import { getDropMapPoint } from './map-helpers';
import useFetch from '../../../lib/useFetch';
import mapPin from '../../../assets/map-pin.svg'

type LatLngLiteral = google.maps.LatLngLiteral;
type Place = {
    id: string;
    lat: number;
    lng: number;
    name: string;
    type: string;
}
type PlaceData = {
    places: Place[]
}

type Props = {
    mapDataState: MapDataState;
    setOffice: (position: LatLngLiteral) => void;
}

const GoogleMapWrapper: FC<Props> = ({ mapDataState, setOffice }) => {
    const mapRef = useRef<google.maps.Map>();
    const placeData = useFetch('/map/place') as PlaceData;

    const updateOffice = useCallback((position: LatLngLiteral) => {
        setOffice(position);
        mapRef.current?.panTo(position)
    }, []);

    useEffect(() => {
        const {places} = placeData;
        if (places) {
            places.map(({lat, lng}) => updateOffice({lat, lng}))
        }
    }, [placeData, updateOffice])

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map
    }, []);

    const dropTargetRef = useRef<HTMLDivElement | null>();
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: PlaceTypes.Office,
        drop: (item: DropItem, monitor) => {
            const mapDropPoint = getDropMapPoint(monitor, dropTargetRef.current, mapRef.current);

            updateOffice(mapDropPoint);

            return { name: 'Dustbin', ...mapDropPoint }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const isActive = canDrop && isOver;
    const backgroundColor = isActive
        ? 'darkgreen'
        : 'darkkhaki';
    const { office } = mapDataState;

    return (
        <div ref={(el) => { drop(el); dropTargetRef.current = el; }}
            style={{ backgroundColor }}
            data-testid="dustbin"
        >
            <GoogleMap
                mapContainerClassName='map-container'
                center={center}
                zoom={10}
                options={mapOptions}
                onLoad={onLoad}
            >
                {
                    office.map(
                        ({ lat, lng }, i) => <MarkerF
                            key={i}
                            position={{ lat, lng }}
                            icon={{
                                url: mapPin,
                            }}
                        />
                    )
                }
            </GoogleMap>
        </div>
    )
}

const Map = React.memo(GoogleMapWrapper)

export default Map
