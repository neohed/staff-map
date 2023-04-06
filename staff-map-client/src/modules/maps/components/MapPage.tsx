import { useReducer, useCallback, useEffect } from "react";
import type { FC } from 'react'
import type { MapPlace, AddMapMarker } from "../lib/types";
import { LoadScript } from '@react-google-maps/api'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import envVars from "../../../lib/env-vars";
import { libraries } from "../lib/map-options";
import Layout from './Layout';
import Map from './Map';
import MapLoading from "./MapLoading";
import useFetch from '../../../lib/useFetch';

const onLoad = () => console.log('gmaps scripts loaded')
const onError = (err: Error) => console.error(err)

export type MapDataState = {
    places: MapPlace[];
}
type Action =
    | { type: 'nill' }
    | { type: 'add-marker'; payload: MapPlace };

const initialState = (): MapDataState => ({
    places: [],
})

function reducer(state: MapDataState, action: Action): MapDataState {
    switch (action.type) {
        case 'nill':
            return { ...state };
        case 'add-marker':
            return { ...state, places: [...state.places, action.payload] };
    }
}

const MapPage: FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState());
    const placeData = useFetch('/map/place') as MapDataState;

    const addMarker = useCallback<AddMapMarker>((position, type) => dispatch({ type: 'add-marker', payload: { type, ...position} }), [])
    
    useEffect(() => {
        const {places} = placeData;
        if (places) {
            places.map(({lat, lng, type}) => addMarker({lat, lng}, type))
        }
    }, [placeData, addMarker])

    return (
        <LoadScript
            id="staff-maps-id"
            googleMapsApiKey={envVars.GOOGLE_MAPS_API_KEY}
            region='EN'
            version='weekly'
            onLoad={onLoad}
            onError={onError}
            loadingElement={<MapLoading />}
            libraries={libraries}
            preventGoogleFontsLoading={false}
        >
            <DndProvider backend={HTML5Backend}>
                <Layout
                    addMarker={
                        addMarker
                    }
                    main={
                        <Map
                            mapDataState={state}
                            addMarker={
                                addMarker
                            }
                        />
                    }
                />
            </DndProvider>
        </LoadScript>
    )
}

export default MapPage;
