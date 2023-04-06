import type { FC } from 'react'
import type { MapPlaceType, MapPlace } from '../lib/types';
import {
    MarkerClustererF,
    MarkerF,
} from '@react-google-maps/api';
import officeMapPin from '../../../assets/crosshairs.svg'
import staffMapPin from '../../../assets/map-pin.svg'
import unknownMapPin from '../../../assets/zoo.svg'

function getMapIcon(type: MapPlaceType) {
    switch (type) {
        case 'Office': {
            return officeMapPin
        }
        case 'Person': {
            return staffMapPin
        }
        default:
            return unknownMapPin
    }
}

type Props = {
    places: MapPlace[];
    type: MapPlaceType;
}

const MapIconGroups: FC<Props> = ({ places, type }) => (
    <>
    <MarkerClustererF>
        {
            (clusterer) => <>
                {
                    places.filter(p => p.type === type).map(
                        ({ lat, lng, type }, i) => <MarkerF
                            key={i}
                            position={{ lat, lng }}
                            clusterer={clusterer}
                            icon={{
                                url: getMapIcon(type),
                            }}
                        />
                    )
                }
            </>
        }
    </MarkerClustererF>
    </>
)

//TODO Clustering renders nothing!
/*
    {
        places.filter(p => p.type === type).map(
            ({ lat, lng, type }, i) => <MarkerF
                key={i}
                position={{ lat, lng }}
                icon={{
                    url: getMapIcon(type),
                }}
            />
        )
    }
*/

export default MapIconGroups
