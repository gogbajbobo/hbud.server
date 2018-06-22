"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const sio_auth = require('socketio-auth');
const logger_1 = __importDefault(require("../internal/logger"));
const log = logger_1.default(module);
function socketStart(server) {
    const io = socket_io_1.default(server);
    sio_auth(io, {
        authenticate: function (socket, data, callback) {
            console.log(`recive ${data}`);
            return callback(new Error("User not found"));
            //get credentials sent by the client
            // var username = data.username;
            // var password = data.password;
            // db.findUser('User', {username:username}, function(err, user) {
            //
            //     if (err || !user) return callback(new Error("User not found"));
            //     return callback(null, user.password == password);
            //     //inform the callback of auth success/failure
            // });
        }
    });
    io.on('connect', socket => {
        log.info(`socket connected ${socket.id}`);
        const authTimer = setTimeout(() => socket.disconnect(true), 1000);
        socket.on('authorize', (data, ack) => {
            if (!data.token) {
                const msg = `no token`;
                log.info(msg);
                ack(msg);
                return;
            }
            log.debug(`authorize ${JSON.stringify(data)}`);
            clearTimeout(authTimer);
        });
        socket.on('disconnect', () => {
            log.info(`disconnect socket ${socket.id}`);
        });
    });
}
exports.default = { socketStart };
