type NullableString = string | null | undefined;

const isNullOrUndefined = (prop: NullableString) => prop === null
    || prop === undefined;

const isEmptyString = (prop: NullableString) => isNullOrUndefined(prop)
    || prop === '';

export type {
    NullableString
}

export {
    isNullOrUndefined,
    isEmptyString,
}