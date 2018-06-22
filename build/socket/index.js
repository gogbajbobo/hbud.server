"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const logger_1 = __importDefault(require("../internal/logger"));
const token_1 = __importDefault(require("../internal/token"));
const users_1 = __importDefault(require("../internal/db/users"));
const sio_auth = require('socketio-auth');
const log = logger_1.default(module);
function socketStart(server) {
    const io = socket_io_1.default(server);
    sio_auth(io, { authenticate });
    io.on('connect', listener);
}
const listener = (socket) => {
    log.info(`socket connected ${socket.id}`);
    socket.on('authenticated', () => {
        log.info(`socket authenticated ${socket.id}`);
    });
    socket.on('disconnect', () => {
        log.info(`disconnect socket ${socket.id}`);
    });
};
const authenticateLog = (err, success, callback) => {
    if (!success) {
        if (err) {
            log.info(`Authentication error: ${err.message}`);
        }
        else {
            log.info('Authentication failure');
        }
    }
    return callback(err, success);
};
const authenticate = (socket, data, callback) => {
    const { token } = data;
    const jwtPayload = token_1.default.extractData(token);
    token_1.default.checkJwtPayload(jwtPayload, (err) => {
        if (err)
            return authenticateLog(err, false, callback);
        users_1.default.getUsersWithRoles(['*'], { username: jwtPayload.username })
            .then(users => {
            const user = users[0];
            Promise.resolve(authenticateLog(null, user ? !user.reauth : false, callback));
        })
            .catch(err => Promise.resolve(authenticateLog(err, false, callback)));
    });
};
exports.default = { socketStart };
