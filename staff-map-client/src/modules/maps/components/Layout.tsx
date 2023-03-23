import React from "react";
import Places from "./Places";
import "./Layout.css";

type Props = {
    isReady: boolean;
    main: JSX.Element;
}

const Layout = ({isReady, main}: Props) => {
    return (
        <div className="container">
            <aside>
                <section>
                    {
                        isReady && <Places setOffice={x => console.log(x)} />
                    }
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
