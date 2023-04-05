import { useReducer, useCallback } from "react";
import type { FC } from 'react'
import type { MapPlace, AddMapMarker } from "./types";
import { LoadScript } from '@react-google-maps/api'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import envVars from "../../../lib/env-vars";
import { libraries } from "./map-options";
import Layout from './Layout';
import Map from './Map';
import MapLoading from "./MapLoading";

const onLoad = () => console.log('gmaps scripts loaded')
const onError = (err: Error) => console.error(err)

export type MapDataState = {
    office: MapPlace[];
}
type Action =
    | { type: 'nill' }
    | { type: 'add-marker'; payload: MapPlace };

const initialState = (): MapDataState => ({
    office: [],
})

function reducer(state: MapDataState, action: Action): MapDataState {
    switch (action.type) {
        case 'nill':
            return { ...state };
        case 'add-marker':
            return { ...state, office: [...state.office, action.payload] };
    }
}

const MapPage: FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState());

    const addMarker = useCallback<AddMapMarker>((position, type) => dispatch({ type: 'add-marker', payload: { type, ...position} }), [])

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
