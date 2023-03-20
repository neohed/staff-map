import {CSSProperties} from "react";

interface MapStyles {
    container: CSSProperties | undefined
}

interface MapProps {
    styles: MapStyles;
}

export type {
    MapStyles,
    MapProps
}
