import React, { useRef, useCallback, useEffect } from 'react'
import type { FC } from 'react'
import type { MapDataState } from './MapPage';
import type { DropItem } from './Toolbox';
import type { AddMapMarker } from './types';
import {
    GoogleMap,
    MarkerF,
} from '@react-google-maps/api';
import { useDrop } from 'react-dnd'
import { center, mapOptions } from './map-options';
import { PlaceTypes, MapPlace } from './types';
import { getDropMapPoint } from './map-helpers';
import useFetch from '../../../lib/useFetch';
import officeMapPin from '../../../assets/crosshairs.svg'
import staffMapPin from '../../../assets/map-pin.svg'
import defaultMapPin from '../../../assets/zoo.svg'

function getMapIcon(type: string) {
    console.log({type})
    switch(type) {
        case 'Office': {
            console.log(officeMapPin)
            return officeMapPin
        }
        case 'Person': {
            console.log(staffMapPin)
            return staffMapPin
        }
        default:
            return defaultMapPin
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

    const updateOffice = useCallback((position: LatLngLiteral) => {
        addMarker(position, 'Person');
        mapRef.current?.panTo(position)
    }, []);

    useEffect(() => {
        const {places} = placeData;
        if (places) {
            places.map(({lat, lng, type}) => addMarker({lat, lng}, type))
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
