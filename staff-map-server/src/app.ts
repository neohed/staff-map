import express from 'express'
import type { Express } from 'express'
import cookieParser from 'cookie-parser'
import morganLogger from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import {errorHandler} from './middleware/express-error-handlers'
import dotenv from 'dotenv';
dotenv.config()

import initRoutes from './routes'
//import {logger} from './middleware/logger'

const app: Express = express();

app.use(helmet());
app.use(cors());

app.use(morganLogger('dev')); //This logs requested routes to stdout in dev.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compression()); //Compress all routes

initRoutes(app);

app.use(errorHandler);

export default app;
