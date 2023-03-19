import type {Request, Response} from "express";

function errorHandler(err: Error, req: Request, res: Response) {
    //logger.error(err)
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    })
}

export {
    errorHandler
}
