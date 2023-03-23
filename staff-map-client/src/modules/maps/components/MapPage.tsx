import React, {useState} from "react";
import Layout from './Layout';
import Map from './Map';

const MapPage = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    return (
        <Layout
            isReady={isLoaded}
            main={
                <Map
                    setReady={setIsLoaded}
                />
            }
        />
    )
}

export default MapPage;
