import React from "react";

export type ContextStoreValues = object | string | number | boolean;

export interface AuthUser {
    isAuthenticated: boolean;
    token: string;
    username: string;
    name: string;
    id: string;
}

export type ContextState = {
    AUTH: AuthUser;
    [key: string]: ContextStoreValues;
}

export type PayloadType1 = {
    key: string;
    value: ContextStoreValues;
}

export type ContextAction =
    | { type: 'SET_VALUE'; payload: PayloadType1; }
    | { type: undefined; payload: any; }

export type ContextType = {
    store: ContextState | null;
    setValue: (key: string, value: ContextStoreValues) => void;
};

const SetValueContext = React.createContext<ContextType>({
    store: null,
    setValue: () => null
})

export function getContextValue(context: ContextType, key: string): AuthUser | ContextStoreValues {
    const {store} = context;
    return store !== null && store[key];
}

export default SetValueContext
