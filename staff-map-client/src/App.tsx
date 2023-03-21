import React from 'react';
/*
import ShapesMap from "./components/ShapesMap";
import BicyclingMap from "./components/BicyclingMap";
import DataMap from "./components/DataMap";
import OverlayMap from "./components/OverlayMap";
import TransitMap from "./components/TransitMap";
import SearchMap from "./components/SearchMap";
 */
import SimpleMap from "./components/SimpleMap";
import type {MapStyles} from "./components/types";
import './App.css';
import {Login} from "./modules/account";
//import SetValueContext, {getContextValue} from "./lib/SetValueContext";
import {Routes, Route, Link} from 'react-router-dom'
import Home from "./components/Home";

const mapProps: MapStyles = {
    container: {
        width: '1200px',
        height: '800px'
    }
}

function App() {
    /*
    const context = useContext(SetValueContext)
    useEffect(() => {
        context.setValue('test', 1)
        context.setValue('a', 12)
    }, [])
    console.log(getContextValue(context, 'AUTH'));
    console.log(getContextValue(context, 'a'));
     */

  return (
    <div className="App">
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/map">Map</Link></li>
            </ul>
        </nav>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<SimpleMap styles={mapProps} />} />
            {
                /* <Route path="/map/:id" element={<SimpleMap styles={mapProps} />} />
                 * const {id} = useParams()
                 */
            }
            {
                /*
                <AdminLayout /> needs to contain an <Outlet /> for the nested route content to appear in!
                Can do: <Outlet context={{ message: 'Hello nested routes!'}} />
                then: const {message} = useOutletContext(); in nested route elements;

                Can copy a route somewhere else, e.g., a sidebar or nav-bar, to get additional content for a route.

                Use a .isActive {} CSS class to style active links!
                or
                <NavLink style={({ isActive }) => isActive ? {'color: red'} : {} }>
                    {
                        ({ isActive }) => ({
                            // Render Props!
                        })
                    }
                </NavLink>

                To navigate (redirect) return <Navigate to="/" />
                or
                const navigate = useNavigate()
                navigate("/", { optional_state: 1 })
                or
                navigate(-1) // like back button

                Search params:
                const [searchParams, setSearchParams] = useSearchParams({n: 3})
                const num = searchParams.get('n');
                setSearchParams({ n: 111 })

                <Link ... state="Fred"
                =>
                const location = useLocation();
                location => { hash:"#test", key:"n8Xfg", pathname:"/", search:"?n=10", state:"Fred" }

                Auth!
                <Route path="/login" element={<LoginPage />} />
                  <Route
                    path="/protected"
                    element={
                      <RequireAuth>
                        <ProtectedPage />
                      </RequireAuth>
                    }
                  />
                </Route>

                

                <Route path="/account" element={<AdminLayout />}>
                    <Route index element={<Account />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                 */
            }
            <Route path="*" element={<div>404</div>} />
        </Routes>
        <Login />
    </div>
  );
}

export default App;
