import React, { useRef, useCallback } from 'react'
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
import mapPin from '../../../assets/map-pin.svg'

type LatLngLiteral = google.maps.LatLngLiteral;

type Props = {
    mapDataState: MapDataState;
    setOffice: (position: google.maps.LatLngLiteral) => void;
}

function GoogleMapWrapper({ mapDataState, setOffice }: Props) {
    const mapRef = useRef<google.maps.Map>();

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map
    }, []);

    const updateOffice = useCallback((position: LatLngLiteral) => {
        setOffice(position);
        mapRef.current?.panTo(position)
    }, []);

    const { office } = mapDataState;

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
