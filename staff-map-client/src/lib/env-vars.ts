import {isEmptyString} from "./strings";

type EnvVars = {
    GOOGLE_MAPS_API_KEY: string;
}

function assertStringVar(key: string): string {
    const value = process.env[key];

    if (isEmptyString(value)) {
        throw Error(`Missing environment variable "${key}" is required!`)
    }

    return value as string
}

const envVars: EnvVars = {
    GOOGLE_MAPS_API_KEY: assertStringVar('REACT_APP_GOOGLE_MAPS_API_KEY')
}

export default envVars
