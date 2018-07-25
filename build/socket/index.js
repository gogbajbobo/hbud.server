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
const is_past_1 = __importDefault(require("date-fns/is_past"));
const sio_auth = require('socketio-auth');
const log = logger_1.default(module);
function socketStart(server) {
    const io = socket_io_1.default(server);
    sio_auth(io, { authenticate });
    io.on('connect', listener);
}
function authenticate(socket, data, callback) {
    const { token } = data;
    const tokenPayload = token_1.default.extractData(token);
    token_1.default.checkJwtPayload(tokenPayload, (err) => {
        if (err)
            return authenticateLog(err, false, callback);
        users_1.default.getUsersWithRoles(['*'], { username: tokenPayload.username })
            .then(users => {
            const user = users[0], userIsGood = user ? !user.reauth : false;
            userIsGood && cache_1.default.set(socket.id, { user, tokenPayload });
            Promise.resolve(authenticateLog(null, userIsGood, callback));
        })
            .catch(err => Promise.resolve(authenticateLog(err, false, callback)));
    });
}
function authenticateLog(err, success, callback) {
    if (!success) {
        log.error(err ? `Authentication error: ${err.message}` : 'Authentication failure');
    }
    return callback(err, success);
}
function listener(socket) {
    log.info(`socket connected ${socket.id}`);
    socket.on('authenticated', () => socketAuthenticated(socket));
    socket.on('disconnect', () => {
        cache_1.default.del(socket.id);
        log.info(`disconnect socket ${socket.id}`);
    });
}
function socketAuthenticated(socket) {
    const socketUserData = cache_1.default.get(socket.id), user = socketUserData.user;
    log.info(`socket authenticated ${socket.id} | ${user.username}`);
    socketUseTokenTTLCheck(socket);
    socketRoutes(socket);
}
function socketUseTokenTTLCheck(socket) {
    socket.use((packet, next) => {
        if (isTokenExpire(socket.id)) {
            socket.emit('unauthorized', { message: 'token expire' });
            return socket.disconnect(true);
        }
        next();
    });
}
function isTokenExpire(socketId) {
    const socketUserData = cache_1.default.get(socketId);
    return is_past_1.default(new Date(socketUserData.tokenPayload.exp * 1000));
}
function socketRoutes(socket) {
    socket.on('test', (ack) => {
        console.log('test event');
        ack();
    });
}
exports.default = { socketStart };
