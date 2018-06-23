import sio, {Socket} from 'socket.io'
import logger from '../internal/logger'
import * as http from "http"
import tokenService from '../internal/token'
import Users from "../internal/db/users";
import socketUserCache from '../internal/cache'
import {UserModel} from "../internal/db";

const sio_auth = require('socketio-auth');
const log = logger(module);

function socketStart(server: http.Server) {

    const io = sio(server);
    sio_auth(io, { authenticate });
    io.on('connect', listener)

}

const listener = (socket: Socket): void => {

    log.info(`socket connected ${ socket.id }`);

    socket.on('authenticated', () => {

        const user: UserModel = socketUserCache.get(socket.id);
        log.info(`socket authenticated ${ socket.id } | ${ user.username }`)

    });

    socket.on('disconnect', () => {

        socketUserCache.del(socket.id);
        log.info(`disconnect socket ${ socket.id }`);

    })

};

const authenticateLog = (err: Error|null, success: boolean, callback: Function) => {

    if (!success) {
        log.error(err ? `Authentication error: ${ err.message }` : 'Authentication failure')
    }
    return callback(err, success)

};

const authenticate = (socket: Socket, data: any, callback: Function) => {

    const { token } = data;
    const tokenPayload = tokenService.extractData(token);

    tokenService.checkJwtPayload(tokenPayload, (err: Error) => {

        if (err) return authenticateLog(err, false, callback);

        Users.getUsersWithRoles(['*'], { username: tokenPayload.username })
            .then(users => {

                const user = users[0];

                socketUserCache.set(socket.id, { user, tokenPayload }, (err: Error, success: boolean) => {

                    if (err || !success) {
                        return Promise.resolve(authenticateLog(err, false, callback))
                    }

                    Promise.resolve(authenticateLog(null, user ? !user.reauth : false, callback))

                });

            })
            .catch(err => Promise.resolve(authenticateLog(err, false, callback)))

    });

};

export default { socketStart }