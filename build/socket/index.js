"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const logger_1 = __importDefault(require("../internal/logger"));
const token_1 = __importDefault(require("../internal/token"));
const users_1 = __importDefault(require("../internal/db/users"));
const cache_1 = __importDefault(require("../internal/cache"));
const sio_auth = require('socketio-auth');
const log = logger_1.default(module);
function socketStart(server) {
    const io = socket_io_1.default(server);
    sio_auth(io, { authenticate });
    io.on('connect', listener);
}
const authenticate = (socket, data, callback) => {
    const { token } = data;
    const tokenPayload = token_1.default.extractData(token);
    token_1.default.checkJwtPayload(tokenPayload, (err) => {
        if (err)
            return authenticateLog(err, false, callback);
        users_1.default.getUsersWithRoles(['*'], { username: tokenPayload.username })
            .then(users => {
            const user = users[0];
            cache_1.default.set(socket.id, { user, tokenPayload }, (err, success) => {
                if (err || !success) {
                    return Promise.resolve(authenticateLog(err, false, callback));
                }
                Promise.resolve(authenticateLog(null, user ? !user.reauth : false, callback));
            });
        })
            .catch(err => Promise.resolve(authenticateLog(err, false, callback)));
    });
};
const authenticateLog = (err, success, callback) => {
    if (!success) {
        log.error(err ? `Authentication error: ${err.message}` : 'Authentication failure');
    }
    return callback(err, success);
};
const listener = (socket) => {
    log.info(`socket connected ${socket.id}`);
    socket.on('authenticated', () => {
        const user = cache_1.default.get(socket.id);
        log.info(`socket authenticated ${socket.id} | ${user.username}`);
    });
    socket.on('disconnect', () => {
        cache_1.default.del(socket.id);
        log.info(`disconnect socket ${socket.id}`);
    });
};
exports.default = { socketStart };
