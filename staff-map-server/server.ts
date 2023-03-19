import createError from 'http-errors'
import express from 'express'
//const path = require('path'
import cookieParser from 'cookie-parser'
import morganLogger from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
//import initRoutes from './routes/index'
//import {logger} from './middleware/logger'
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors());

app.use(morganLogger('dev')); //This logs requested routes to stdout in dev.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compression()); //Compress all routes

//initRoutes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    //logger.info('Here be dragons. Route not found')
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    //logger.error(err)
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    //res.render('error');
    res.json({error: err})
});

export default app;
