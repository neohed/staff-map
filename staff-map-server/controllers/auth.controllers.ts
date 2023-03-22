import bcrypt from "bcrypt"
import type {Request, Response} from 'express';
import {generateToken, getCleanUser} from '../lib/auth-jwt';
import userRepo = require('../model/user.model');
import {hashPassword} from '../lib/auth-hash';
import jwt from 'jsonwebtoken';
import {isEmptyString} from "../lib/strings";
//import {EventTypes} from '../model/EventType';

const EventTypes = {
    LoginSuccess: 1,
    LoginFailure: 2,
}

async function postRegister(req: Request, res: Response) {
    const {username, password} = req.body;

    /*
    // Return 400 status if username/password does not exist.
    if (isEmptyString(username) || isEmptyString(password)) {
        return res.status(400).json({
            error: true,
            message: "Username or Password is required."
        });
    }

    const hashedPassword = await hashPassword(password);
    const userEntity = await userRepo.addUser({username, password: hashedPassword});

    const user = getCleanUser(userEntity);

    // return the token along with user details
    return res.json({ user });

     */
    return res.json({ });
}

async function postLogin(req: Request, res: Response) {
    const {email, password} = req.body;

    // Return 400 status if username/password does not exist.
    if (!email || !password) {
        return res.status(400).json({
            error: true,
            message: "Username or Password is required."
        });
    }

    const userEntity = await userRepo.getUserByEmail(email);
    const iP_Address = req.socket.remoteAddress;

    // Return 401 status if the credentials do not match.
    bcrypt.compare(password, userEntity.password, function(err, result) {
        // *** Login FAIL!
        if (err || !result) {
            /*
            userRepo.addUserEvent({
                userId: userEntity.id,
                eventTypeId: EventTypes.LoginFailure,
                iP_Address
            });
             */

            return res.status(401).json({
                error: true,
                message: "Username or Password is wrong."
            });
        }

        // *** Login SUCCESS!
        /*
        userRepo.addUserEvent({
            userId: userEntity.id,
            eventTypeId: EventTypes.LoginSuccess,
            iP_Address
        });
         */
        // generate token
        const token = generateToken(userEntity);
        // get basic user details
        const userObj = getCleanUser(userEntity);

        // return the token along with user details
        return res.json({ user: userObj, token });
    });
}

async function getVerifyToken(req: Request, res: Response) {
    // check header or url parameters or post parameters for token
    const token = req.query.token;
    if (!token) {
        return res.status(400).json({
            error: true,
            message: "Token is required."
        });
    }

    throw Error('Kaboom!')
    /*
    // check token that was passed by decoding token using secret
    jwt.verify(token, process.env.JWT_SECRET, async function (err, user) {
        if (err) return res.status(401).json({
            error: true,
            message: "Invalid token."
        });

        const userEntity = await userRepo.getUserByUsername(user.userId);

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

     */
}

export {
    postRegister,
    postLogin,
    getVerifyToken,
}
