function toCamelCase(s: string) {
    return s[0].toLowerCase() + s.slice(1)
}

function toPascalCase(s: string) {
    return s[0].toUpperCase() + s.slice(1)
}

function toBase64(plainString: string) {
    const buff = Buffer.from(plainString, 'utf-8');
    return buff.toString('base64');
}

function fromBase64(base64String) {
    const buff = Buffer.from(base64String, 'base64');
    return buff.toString('utf-8');
}

function makeSafe(s: string, maxLength = 160) {
    return s.replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, maxLength)
}

const isNullOrUndefined = prop => prop === null || prop === undefined;
const isEmptyString = prop => isNullOrUndefined(prop) || prop === '';

export {
    toCamelCase,
    toPascalCase,
    toBase64,
    fromBase64,
    makeSafe,
    isNullOrUndefined,
    isEmptyString,
}
