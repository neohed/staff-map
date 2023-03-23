import React from "react";
import Places from "./Places";
import "./Layout.css";

type Props = {
    main: JSX.Element;
    setOffice: (position: google.maps.LatLngLiteral) => void;
}

const Layout = ({main, setOffice}: Props) => {
    return (
        <div className="container">
            <aside>
                <section>
                    <Places
                        getPlace={place => setOffice(place)}
                    />
                </section>
                <section>Marker</section>
                <section>Navigate</section>
                <section>Route</section>
            </aside>
            <main>
                {
                    main
                }
            </main>
        </div>
    )
}

export default Layout
