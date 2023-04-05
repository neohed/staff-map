import {useContext} from "react";
import SetValueContext, {getContextValue} from "../../../lib/SetValueContext";
import type {AuthUser} from "../../../lib/SetValueContext";

const useAuth = (): AuthUser => {
    const context = useContext(SetValueContext);

    return getContextValue(context, 'AUTH') as AuthUser;
}

export default useAuth
