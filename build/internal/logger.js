"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston = __importStar(require("winston"));
require('winston-daily-rotate-file');
function logger(module) {
    const path = module.filename.split('/').slice(-2).join('/'); //using filename in log statements
    const consoleLogger = new winston.transports.Console({
        colorize: true,
        level: 'silly',
        label: path
    });
    const dailyRotateFileLogger = new winston.transports.DailyRotateFile({
        timestamp: true,
        dirname: `../hbud.logs/${process.env.appname}/`,
        filename: `${process.env.appname}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        maxSize: '20m',
        maxFiles: '3d',
        level: 'info',
        label: path,
        json: false
    });
    let transports = [dailyRotateFileLogger];
    process.env.NODE_ENV === 'production' || transports.push(consoleLogger);
    return new winston.Logger({ transports });
}
exports.default = logger;
