import jwt from "jsonwebtoken";
import type {Secret} from "jsonwebtoken";
import type {Request, Response, NextFunction} from 'express';
import type {User} from "../model/user.model";

type AuthRequest = Request & {
    user?: User
}

// return basic user details
function getCleanUser(user: User) {
    if (!user) return null;

    const {id, name, email, roles} = user;

    return {
        id,
        name,
        email,
        roles,
    }
}

// generate token and return it
function generateToken(user: User) {
    //1. Don't use password and other sensitive fields
    //2. Use the information that are useful in other parts
    if (!user) return null;

    const signInUser = getCleanUser(user);

    return jwt.sign(
        signInUser as object,
        process.env.MY_JWT_SECRET as Secret, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
}

function getUserObjectFromAuthHeader(req: AuthRequest, res: Response, next: NextFunction) {
    // check header or url parameters or post parameters for token
    const token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue

    jwt.verify(token, process.env.MY_JWT_SECRET as Secret, function (err, user) {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        } else {
            req.user = user as User; //set the user to req so other routes can use it

            next();
        }
    });
}

function cerberusGuard(req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization || !req.user) {
        return res.status(403).json({ error: 'Cerberus, no credentials sent!' })
    }

    next()
}

const authorizeRoles = (allowedRoles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user === undefined) {
        return res.status(403).json({ error: 'Cerberus, no credentials sent!' })
    }
    const {roles} = user;

    if (!roles.some(role => allowedRoles.includes(role))) {
        return res.status(403).json({ error: 'Cerberus, you are not authorized for this!' })
    }

    next()
}

export {
    generateToken,
    getCleanUser,
    getUserObjectFromAuthHeader,
    cerberusGuard,
    authorizeRoles,
}
