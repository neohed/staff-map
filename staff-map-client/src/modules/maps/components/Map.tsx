import React, { useRef, useCallback } from 'react'
import type { FC } from 'react'
import type { MapDataState } from './MapPage';
import type { DropItem } from './DragItem';
import type { AddMapMarker, MapPlaceType, MapPlace } from '../lib/types';
import {
    GoogleMap,
} from '@react-google-maps/api';
import { useDrop } from 'react-dnd'
import { center, mapOptions } from '../lib/map-options';
import { getDropMapPoint } from '../lib/map-helpers';
import MapIconGroups from './MapIconGroups';
import usePost from '../../../lib/usePost';

type LatLngLiteral = google.maps.LatLngLiteral;

type Props = {
    mapDataState: MapDataState;
    addMarker: AddMapMarker;
}

const GoogleMapWrapper: FC<Props> = ({ mapDataState, addMarker }) => {
    const mapRef = useRef<google.maps.Map>();
    const addPlace = usePost<MapPlace>('/map/place');

    const dropMarker = useCallback((position: LatLngLiteral, type: MapPlaceType) => {
        addPlace({
            ...position,
            type,
            name: 'New item'
        });
        addMarker(position, type);
        mapRef.current?.panTo(position)
    }, []);

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
    const { places } = mapDataState;

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
                <MapIconGroups places={places} type="Office" />
                <MapIconGroups places={places} type="Person" />
            </GoogleMap>
        </div>
    )
}

const Map = React.memo(GoogleMapWrapper)

export default Map
