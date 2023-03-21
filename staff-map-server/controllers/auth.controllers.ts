import bcrypt from "bcrypt"
import {generateToken, getCleanUser} from '../lib/auth-jwt';
import {hashPassword} from '../lib/auth-hash';
import jwt from 'jsonwebtoken';
import {isEmptyString} from "../lib/strings";
//import db = require('../db');
//import {EventTypes} from '../model/EventType';

async function postRegister(req, res) {
    const {username, password} = req.body;

    // Return 400 status if username/password does not exist.
    if (isEmptyString(username) || isEmptyString(password)) {
        return res.status(400).json({
            error: true,
            message: "Username or Password is required."
        });
    }

    const hashedPassword = await hashPassword(password);
    const userEntity = await db.addUser({username, password: hashedPassword});
    const user = getCleanUser(userEntity);

    // return the token along with user details
    return res.json({ user });
}

async function postLogin(req, res) {
    const {username, password} = req.body;

    // Return 400 status if username/password does not exist.
    if (!username || !password) {
        return res.status(400).json({
            error: true,
            message: "Username or Password is required."
        });
    }

    const userEntity = await db.getUserByUsername(username);
    const iP_Address = req.connection.remoteAddress;

    // Return 401 status if the credentials do not match.
    bcrypt.compare(password, userEntity.password, function(err, result) {
        // *** Login FAIL!
        if (err || !result) {
            db.addUserEvent({
                userId: userEntity.id,
                eventTypeId: EventTypes.LoginFailure,
                iP_Address
            });

            return res.status(401).json({
                error: true,
                message: "Username or Password is wrong."
            });
        }

        // *** Login SUCCESS!
        db.addUserEvent({
            userId: userEntity.id,
            eventTypeId: EventTypes.LoginSuccess,
            iP_Address
        });
        // generate token
        const token = generateToken(userEntity);
        // get basic user details
        const userObj = getCleanUser(userEntity);

        // return the token along with user details
        return res.json({ user: userObj, token });
    });
}

async function getVerifyToken(req, res) {
    // check header or url parameters or post parameters for token
    const token = req.query.token;
    if (!token) {
        return res.status(400).json({
            error: true,
            message: "Token is required."
        });
    }

    // check token that was passed by decoding token using secret
    jwt.verify(token, process.env.JWT_SECRET, async function (err, user) {
        if (err) return res.status(401).json({
            error: true,
            message: "Invalid token."
        });

        const userEntity = await db.getUserByUsername(user.userId);

        // return 401 status if the userId does not match.
        if (!userEntity || user.userId !== userEntity.userId) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        }

        // get basic user details
        const userObj = getCleanUser(userEntity);
        return res.json({ user: userObj, token });
    });
}

export {
    postRegister,
    postLogin,
    getVerifyToken,
}
