import { CSSProperties } from "react";

const PlaceTypes = {
    Person: 'person',
    Office: 'office',
}

export {
    PlaceTypes,
}

interface MapStyles {
    container: CSSProperties | undefined
}

interface MapProps {
    styles: MapStyles;
}

type MapPlaceType = keyof typeof PlaceTypes;

type MapPlace = {
    id?: string;
    name?: string;
    lat: number;
    lng: number;
    type: MapPlaceType;
}

type AddMapMarker = (position: google.maps.LatLngLiteral, type: MapPlaceType) => void;

export type {
    MapStyles,
    MapProps,
    MapPlaceType,
    MapPlace,
    AddMapMarker,
}