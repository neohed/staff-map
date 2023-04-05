import type { FC } from 'react'
import type { AddMapMarker } from './types';
import Places from "./Places";
import Toolbox from "./Toolbox";
import "./Layout.css";

type Props = {
    main: JSX.Element;
    addMarker: AddMapMarker;
}

const Layout: FC<Props> = ({main, addMarker}) => {
    return (
        <div className="container">
            <aside>
                <section>
                    <Places
                        getPlace={place => addMarker(place, 'Office')}
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
