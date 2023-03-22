// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fs = require('fs')
const { readFile } = require('fs/promises')

const log = {
    _: (code, msg) => console.log(`\x1b[${code}m${msg}\x1b[0m`),
    info: msg => log._(92, msg),
    warn: msg => log._(93, msg),
    error: msg => log._(91, msg)
}

const env_path = './.env'
const db_path = './prisma/data.db'

async function read(path) {
    return await readFile(path, 'utf8')
}
async function write(contents) {
    await fs.writeFileSync('./.env', contents)
}
async function createEnv(secret_key) {
    const contents = await read('./_scripts/env.template');

    await write(contents.replace('{{MY_JWT_SECRET}}', secret_key))
}

(async function () {
    try {
    if (fs.existsSync(env_path)) {
        log.info('.env file found.')
    } else {
        log.warn('.env file NOT found!')
        log.info('Creating .env file.')
        const secret = require('crypto').randomBytes(45).toString('base64');
        await createEnv(secret)
    }

    if (!fs.existsSync(db_path)) {
        log.error('Error! Prisma DB does not exist. Follow steps in README.md, section: "Prisma Initialise"\n\n');
        process.exit(1)
    }
} catch(err) {
    log.error(err)
}
})();