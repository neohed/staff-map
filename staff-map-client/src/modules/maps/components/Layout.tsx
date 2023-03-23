import React from "react";
import "./Layout.css";

const Layout = ({main}: {main: JSX.Element}) => {
    return (
        <div className="container">
            <aside>
                <section>Marker</section>
                <section>Place</section>
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
