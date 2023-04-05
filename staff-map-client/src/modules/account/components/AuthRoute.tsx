import type { FC } from 'react'
import {
    Navigate,
    useLocation
} from 'react-router-dom'
import useAuth from "./useAuth";

type Props = {
    children: JSX.Element;
}

const AuthRoute: FC<Props> = ({ children }) => {
    let {isAuthenticated} = useAuth();
    let location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}

export default AuthRoute
