import {Libraries} from "@react-google-maps/api/dist/utils/make-load-script-url";
import { PlaceTypes } from "./types";

const center: google.maps.LatLngLiteral = {
    lat: 51.50052933987512,
    lng: -0.12615771706025705
}

const mapOptions: google.maps.MapOptions = {
    // mapId: '33c9314ebf331b36',
    disableDefaultUI: true,
    clickableIcons: false,
    streetViewControl: false,
}

const defaultOptions = {
    strokeOpacity: .5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
}

const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: .05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
}

const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: .05,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D",
}

const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: .05,
    strokeColor: "#FF5252",
    fillColor: "#FF5252",
}

const libraries: Libraries = ['drawing', 'visualization', 'places'];

export {
    center,
    mapOptions,
    defaultOptions,
    closeOptions,
    middleOptions,
    farOptions,
    libraries,
}
