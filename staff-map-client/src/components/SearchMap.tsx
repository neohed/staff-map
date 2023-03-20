import React, { memo } from 'react'
import type {CSSProperties} from "react";
import PropTypes from 'prop-types'
import {GoogleMap, StandaloneSearchBox, useJsApiLoader} from '@react-google-maps/api'
import {MapProps} from "./types";
import envVars from "../lib/env-vars";
import MapLoading from "./MapLoading";

const ExampleSearchBoxPropTypes = {
    styles: PropTypes.shape({
        container: PropTypes.object.isRequired,
    }).isRequired,
}

const center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: -180,
}

const inputStyle: CSSProperties = {
    boxSizing: `border-box`,
    border: `1px solid transparent`,
    width: `240px`,
    height: `32px`,
    padding: `0 12px`,
    borderRadius: `3px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    fontSize: `14px`,
    outline: `none`,
    textOverflow: `ellipses`,
    position: 'absolute',
    top: '10px',
    right: '10px',
}

const onClick = (...args: any[]) => {
    console.log('onClick args: ', args)
}

function ExampleSearchBox({ styles }: MapProps) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: envVars.GOOGLE_MAPS_API_KEY
    })

    if (!isLoaded) {
        return <MapLoading />
    }

    return (
        <div className='map'>
            <div className='map-container'>
                <GoogleMap
                    id='search-box-example'
                    mapContainerStyle={styles.container}
                    zoom={2}
                    center={center}
                    onClick={onClick}
                >
                    <StandaloneSearchBox>
                        <input
                            type='text'
                            placeholder='Customized your placeholder'
                            style={inputStyle}
                        />
                    </StandaloneSearchBox>
                </GoogleMap>
            </div>
        </div>
    )
}

ExampleSearchBox.propTypes = ExampleSearchBoxPropTypes

export default memo(ExampleSearchBox)
