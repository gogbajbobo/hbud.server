"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const log = logger_1.default(module);
function responseFinished() {
    return (req, res, next) => {
        function afterResponse() {
            res.removeListener('finish', afterResponse);
            logRequest(req, res);
        }
        res.on('finish', afterResponse);
        next();
    };
}
function logRequest(req, res) {
    process.env.NODE_ENV === 'production' || (log.transports.console.level = 'error');
    log.info(req.method, req.originalUrl, res.statusCode, res.getHeader('Content-Length'), req.get('User-Agent'), req.ip);
    process.env.NODE_ENV === 'production' || (log.transports.console.level = 'silly');
}
exports.default = responseFinished;
