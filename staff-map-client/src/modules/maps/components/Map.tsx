import React, { useRef, useCallback, useEffect } from 'react'
import type { FC } from 'react'
import type { MapDataState } from './MapPage';
import type { DropItem } from './DragItem';
import type { AddMapMarker, MapPlaceType, MapPlace } from './types';
import {
    GoogleMap,
    MarkerF,
} from '@react-google-maps/api';
import { useDrop } from 'react-dnd'
import { center, mapOptions } from './map-options';
import { getDropMapPoint } from './map-helpers';
import useFetch from '../../../lib/useFetch';
import officeMapPin from '../../../assets/crosshairs.svg'
import staffMapPin from '../../../assets/map-pin.svg'
import unknownMapPin from '../../../assets/zoo.svg'

function getMapIcon(type: MapPlaceType) {
    switch(type) {
        case 'Office': {
            return officeMapPin
        }
        case 'Person': {
            return staffMapPin
        }
        default:
            return unknownMapPin
    }
}

type LatLngLiteral = google.maps.LatLngLiteral;
type PlaceData = {
    places: MapPlace[]
}
type Props = {
    mapDataState: MapDataState;
    addMarker: AddMapMarker;
}

const GoogleMapWrapper: FC<Props> = ({ mapDataState, addMarker }) => {
    const mapRef = useRef<google.maps.Map>();
    const placeData = useFetch('/map/place') as PlaceData;

    const dropMarker = useCallback((position: LatLngLiteral, type: MapPlaceType) => {
        addMarker(position, type);
        mapRef.current?.panTo(position)
    }, []);

    useEffect(() => {
        const {places} = placeData;
        if (places) {
            places.map(({lat, lng, type}) => addMarker({lat, lng}, type))
        }
    }, [placeData, addMarker])

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map
    }, []);

    const dropTargetRef = useRef<HTMLDivElement | null>();
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ['Person', 'Office'],
        drop: (item: DropItem, monitor) => {
            const mapDropPoint = getDropMapPoint(monitor, dropTargetRef.current, mapRef.current);

            dropMarker(mapDropPoint, item.type);

            return { name: 'Map', ...mapDropPoint }
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
                        ({ lat, lng, type }, i) => <MarkerF
                            key={i}
                            position={{ lat, lng }}
                            icon={{
                                url: getMapIcon(type),
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
