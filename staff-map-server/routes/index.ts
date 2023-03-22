import {getUserObjectFromAuthHeader, cerberusGuard, authorizeRoles} from '../lib/auth-jwt'
import {roles} from '../model/role.model'
import authRouter from "./auth.routes"
import adminRouter from "./admin.routes"
import mapRouter from "./map.routes"
import type {Express} from "express";

const routes = (app: Express) => {
    app.use(getUserObjectFromAuthHeader); // See if we have a JWT object in request header!
    app.use('/auth', authRouter);

    app.use(cerberusGuard); // Guard further routes against unauthenticated access.
    app.use(authorizeRoles([roles.user, roles.admin]));
    app.use('/map', mapRouter);

    app.use(authorizeRoles([roles.admin]));
    app.use('/admin', adminRouter);
};

export default routes;
