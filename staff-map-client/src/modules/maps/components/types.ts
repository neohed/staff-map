import { CSSProperties } from "react";

interface MapStyles {
    container: CSSProperties | undefined
}

interface MapProps {
    styles: MapStyles;
}

const PlaceTypes = {
    Person: 'person',
    Office: 'office',
}

export {
    PlaceTypes,
}

export type {
    MapStyles,
    MapProps,
}
