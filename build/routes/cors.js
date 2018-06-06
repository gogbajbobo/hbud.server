"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../internal/config"));
const network = config_1.default.get(`network`);
const allowedOrigins = Object.values(network).map(host => `${host.protocol}://${host.hostname}:${host.port}`);
const protocol = config_1.default.get(`network:${process.env.appname}:protocol`);
const hostname = config_1.default.get(`network:${process.env.appname}:hostname`);
const port = config_1.default.get(`network:${process.env.appname}:port`);
const selfHost = `${protocol}://${hostname}:${port}`;
const rootRoute = (router) => {
    router.route('*')
        .all((req, res, next) => {
        const reqOrigin = req.headers['origin'];
        const corsOrigin = allowedOrigins.includes(reqOrigin) ? reqOrigin : selfHost;
        res.header("Access-Control-Allow-Origin", corsOrigin);
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
        if (req.method === 'OPTIONS') {
            res.status(200).end();
        }
        else {
            next();
        }
    });
};
exports.default = rootRoute;
