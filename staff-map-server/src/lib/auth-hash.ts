import bcrypt from 'bcrypt'
import {logger} from '../middleware/logger'

async function hashPassword(password: string, saltRounds = 12): Promise<string> {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash password
        return await bcrypt.hash(password, salt)
    } catch (error) {
        logger.error(error);
        throw error
    }
}

export {
    hashPassword,
}
