require("dotenv").config({ path: './.env.local' });

const log = {
    _: (code, msg) => console.log(`\x1b[${code}m${msg}\x1b[0m`),
    info: msg => log._(92, msg),
    warning: msg => log._(93, msg),
    error: msg => log._(91, msg)
}

const gmailApiKeyName = 'REACT_APP_GOOGLE_MAPS_API_KEY';
const gmailApiKey = process.env[gmailApiKeyName];

if (gmailApiKey === undefined || gmailApiKey === '') {
    log.error(`Error! Key: "${gmailApiKeyName}" in environment file: ".env.local" not found.`);
    log.error('Please ensure both the env file and API key exist.');
    log.warning('For help creating a Google maps API key, see section "Configuring Google Maps API Key" in "README.md".\n\n');

    process.exit(1) // error
} else {
    log.info('Key for google maps found.\n\nProceeding...');

    process.exit(0) // success
}
