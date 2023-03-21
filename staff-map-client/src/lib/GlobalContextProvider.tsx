import React, {useReducer} from "react"
import SetValueContext from './SetValueContext'
import type {ContextState, ContextAction, PayloadType1, ContextStoreValues} from "./SetValueContext";

const init: ContextState = {
    AUTH: {
        isAuthenticated: false,
        token: '',
        username: '', // Email
        name: '',
        id: '',
    }
}

const reducer = (state: ContextState, action: ContextAction): ContextState => {
    const {type, payload} = action;

    switch (type) {
        case 'SET_VALUE': {
            const {key, value} = payload as PayloadType1;

            return {
                ...state,
                [key]: value
            } as ContextState
        }
        default:
            return state
    }
}

type Props = {
    children: React.ReactNode;
};

const GlobalContextProvider = ({ children }: Props) => {
    const [store, dispatch] = useReducer(reducer, init);

    return (
        <SetValueContext.Provider value={{
            store,
            setValue: (key: string, value: ContextStoreValues) => dispatch({
                type: 'SET_VALUE',
                payload: {
                    key,
                    value
                }
            })
        }}>
            {
                children
            }
        </SetValueContext.Provider>
    )
}

export default GlobalContextProvider