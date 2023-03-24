import React from "react";
import type { FC } from 'react'
import Places from "./Places";
import Toolbox from "./Toolbox";
import "./Layout.css";

type Props = {
    main: JSX.Element;
    setOffice: (position: google.maps.LatLngLiteral) => void;
}

const Layout: FC<Props> = ({main, setOffice}) => {
    return (
        <div className="container">
            <aside>
                <section>
                    <Places
                        getPlace={place => setOffice(place)}
                    />
                </section>
                <section>
                    <Toolbox />
                </section>
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
