import jwt from "jsonwebtoken";

// return basic user details
function getCleanUser(user) {
    if (!user) return null;

    const {id, name, username, roles} = user;

    return {
        id,
        name,
        username,
        roles,
    }
}

// generate token and return it
function generateToken(user) {
    //1. Don't use password and other sensitive fields
    //2. Use the information that are useful in other parts
    if (!user) return null;

    const signInUser = getCleanUser(user);

    return jwt.sign(
        signInUser,
        process.env.MY_JWT_SECRET, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
}

function getUserObjectFromAuthHeader(req, res, next) {
    // check header or url parameters or post parameters for token
    const token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue

    jwt.verify(token, process.env.MY_JWT_SECRET, function (err, user) {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "YFA - Invalid user."
            });
        } else {
            req.user = user; //set the user to req so other routes can use it

            next();
        }
    });
}

function cerberusGuard(req, res, next) {
    if (!req.headers.authorization || !req.user) {
        return res.status(403).json({ error: 'Cerberus, no credentials sent!' });
    }

    next()
}

const authorizeRoles = (allowedRoles) => (req, res, next) => {
    const user = req.user;
    const {roles} = user;

    if (!roles.some(role => allowedRoles.includes(role))) {
        return res.status(403).json({ error: 'Cerberus, you are not authorized for this!' });
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
