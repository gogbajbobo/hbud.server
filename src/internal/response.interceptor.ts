import logger from './logger'
const log = logger(module);

import { Request, Response, NextFunction } from 'express';

function responseFinished() {

    return (req: Request, res: Response, next: NextFunction) => {

        function afterResponse() {

            res.removeListener('finish', afterResponse);

            logRequest(req, res);

        }

        res.on('finish', afterResponse);

        next();

    };

}

function logRequest(req: Request, res: Response) {

    log.transports.console.level = 'error';
    log.info(req.method, req.originalUrl, res.statusCode, res.getHeader('Content-Length'), req.get('User-Agent'), req.ip);
    log.transports.console.level = 'silly';

}

export default responseFinished;