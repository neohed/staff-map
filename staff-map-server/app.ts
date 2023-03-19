import express, { Express, Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import morganLogger from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'

//import initRoutes from './routes/index'
//import {logger} from './middleware/logger'

require('dotenv').config();

const app: Express = express();

app.use(helmet());
app.use(cors());

app.use(morganLogger('dev')); //This logs requested routes to stdout in dev.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compression()); //Compress all routes

//initRoutes(app);

// error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    //logger.error(err)
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    })
});

export default app;
