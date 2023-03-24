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

type MapPlace = {
    lat: number;
    lng: number;
    type: keyof typeof PlaceTypes;
}

export type {
    MapStyles,
    MapProps,
    MapPlace,
}