import {useContext} from "react";
import SetValueContext, {getContextValue} from "../../../lib/SetValueContext";
import type {AuthUser} from "../../../lib/SetValueContext";

const useAuth = () => {
    const context = useContext(SetValueContext);

    const {isAuthenticated} = getContextValue(context, 'AUTH') as AuthUser;

    return isAuthenticated
}

export default useAuth
