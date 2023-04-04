import React, { useRef, useCallback } from 'react'
import type { MapDataState } from './MapPage';
import type { XYCoord } from 'react-dnd'
import type {DropItem} from './Toolbox';
import {
    GoogleMap,
    MarkerF,
} from '@react-google-maps/api';
import { useDrop } from 'react-dnd'
import { center, mapOptions } from './map-options';
import { PlaceTypes } from './types';
import { getDropPoint, point2LatLng } from './map-helpers';
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

    //TODO Create a DropWrapper?

    const dropTargetRef = useRef<HTMLDivElement | null>();
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: PlaceTypes.Office,
        drop: (item: DropItem, monitor) => {
            // Get the dropped item's client offset
            const dropOffset = monitor.getClientOffset();

            // Get the drop target's bounding client rect
            const dropTargetRect = dropTargetRef.current?.getBoundingClientRect();

            const dropPoint: google.maps.Point = getDropPoint(dropOffset as XYCoord, dropTargetRect as DOMRect);

            const dropCoords = point2LatLng(dropPoint, mapRef.current as google.maps.Map);

            const dropLat: number = dropCoords?.lat() ?? 0;
            const dropLng: number = dropCoords?.lng() ?? 0;
            
            updateOffice({ lat: dropLat, lng: dropLng })
            return { name: 'Dustbin', dropLat, dropLng }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const isActive = canDrop && isOver
    let backgroundColor = '#222'
    if (isActive) {
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }

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
