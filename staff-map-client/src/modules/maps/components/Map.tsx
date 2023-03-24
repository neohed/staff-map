import React, { useRef, useCallback } from 'react'
import {
    GoogleMap,
    MarkerF,
    /*
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
     */
} from '@react-google-maps/api';
import { useDrop } from 'react-dnd'
import { center, mapOptions } from './map-options';
import type { MapDataState } from './MapPage';
import { PlaceTypes, MapPlace } from './types';
import { point2LatLng } from './map-helpers';
//import pinSquare from '../../../assets/square-pin.svg'
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
        drop: (item, monitor) => {
            // Get the dropped item's client offset
            const dropOffset = monitor.getClientOffset();

            // Get the drop target's bounding client rect
            const dropTargetRect = dropTargetRef.current?.getBoundingClientRect();

            // Calculate the relative x and y offset
            const offsetX: number = (dropOffset !== null && dropTargetRect !== undefined)
                ? dropOffset.x - dropTargetRect.left
                : 0;
            const offsetY: number = (dropOffset !== null && dropTargetRect !== undefined)
                ? dropOffset.y - dropTargetRect.top
                : 0;

            const dropPoint: google.maps.Point = new google.maps.Point(offsetX, offsetY);

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
        <div ref={(el) => { drop(el); dropTargetRef.current = el; }} style={{ backgroundColor }} data-testid="dustbin">
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

/*
 * https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png
 */
const Map = React.memo(GoogleMapWrapper)

export default Map
