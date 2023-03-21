import bcrypt from 'bcrypt'
import {logger} from '../middleware/logger'

const hashPassword = async (password, saltRounds = 12) => {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash password
        return await bcrypt.hash(password, salt);
    } catch (error) {
        logger.error(error);
    }

    // Return null if error
    return null;
};

export {
    hashPassword,
}
