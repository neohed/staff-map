import { memo } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, TransitLayer, useJsApiLoader, MarkerClustererF, MarkerF } from '@react-google-maps/api'
import { MapProps } from "../features/maps";
import envVars from "../lib/env-vars";
import MapLoading from "./MapLoading";

const ExampleTransitPropTypes = {
    styles: PropTypes.shape({
        container: PropTypes.object.isRequired,
    }).isRequired,
}

const center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: -180,
}

const onClick = (...args: any[]) => {
    console.log('onClick args: ', args)
}

const onTransitLayerLoad = (transitLayer: google.maps.TransitLayer) => {
    // Do something with transitLayer
    console.log('transitLayer: ', transitLayer)
}

const onMapLoad = (map: google.maps.Map) => {
    console.log('map: ', map)
}

function ExampleTransit({ styles }: MapProps): JSX.Element {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: envVars.GOOGLE_MAPS_API_KEY
    })

    if (!isLoaded) {
        return <MapLoading />
    }

    /*
    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
     */
    const fetchDirections = (position: google.maps.LatLngLiteral) => {

    }
    const offices: number[] = [1, 2, 3];

    return (
        <div className='map'>
            <div className='map-container'>
                <GoogleMap
                    id='transit-example'
                    mapContainerStyle={styles.container}
                    zoom={2}
                    center={center}
                    onClick={onClick}
                    onLoad={onMapLoad}
                >
                    { /*
                   * onUnmount={onUnmount}
                   * Child components, such as markers, info windows, etc.
                   *
                   */ }
                    <MarkerClustererF>
                        {
                            (clusterer) => <>
                                {
                                    offices.map((n: number) => (
                                        <MarkerF
                                            key={n.toString()}
                                            position={{ lat: 1.0, lng: 1.0 }}
                                            clusterer={clusterer}
                                            onClick={() => fetchDirections({ lat: 1.0, lng: 1.0 })}
                                        />
                                    ))
                                }
                            </>
                        }
                    </MarkerClustererF>
                    <TransitLayer onLoad={onTransitLayerLoad} />
                </GoogleMap>
            </div>
        </div>
    )
}

ExampleTransit.propTypes = ExampleTransitPropTypes

export default memo(ExampleTransit)
