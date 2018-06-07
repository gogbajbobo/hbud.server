import { Router, Request, Response, NextFunction } from 'express'
import config from '../../internal/config'

const network: Object = config.get(`network`);
const allowedOrigins: string[] = Object.values(network).map(host => `${ host.protocol }://${ host.hostname }:${ host.port }`);

const protocol = config.get(`network:${ process.env.appname }:protocol`);
const hostname = config.get(`network:${ process.env.appname }:hostname`);
const port = config.get(`network:${ process.env.appname }:port`);

let selfHost = `${ protocol }://${ hostname }`;
if (port) selfHost = `${ selfHost }:${ port }`;

const rootRoute = (router: Router) => {

    router.route('*')
        .all((req: Request, res: Response, next: NextFunction) => {

            const reqOrigin = req.headers['origin'] as string;
            const corsOrigin: string = allowedOrigins.includes(reqOrigin) ? reqOrigin : selfHost;

            res.header("Access-Control-Allow-Origin", corsOrigin);
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');

            if (req.method === 'OPTIONS') {
                res.status(200).end()
            } else {
                next()
            }

        });

};

export default rootRoute
