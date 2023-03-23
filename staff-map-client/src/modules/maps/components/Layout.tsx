import React from "react";
import Places from "./Places";
import "./Layout.css";

type Props = {
    main: JSX.Element;
}

const Layout = ({main}: Props) => {
    return (
        <div className="container">
            <aside>
                <section>
                <Places setOffice={x => console.log(x)} />
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
