import sio, {Socket} from 'socket.io'
import logger from '../internal/logger'
import * as http from "http"
import tokenService from '../internal/token'
import Users from "../internal/db/users";

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
        log.info(`socket authenticated ${ socket.id }`)
    });

    socket.on('disconnect', () => {
        log.info(`disconnect socket ${ socket.id }`);
    })

};

const authenticateLog = (err: Error|null, success: boolean, callback: Function) => {

    if (!success) {
        if (err) {
            log.info(`Authentication error: ${ err.message }`);
        } else {
            log.info('Authentication failure');
        }
    }

    return callback(err, success)

};

const authenticate = (socket: Socket, data: any, callback: Function) => {

    const { token } = data;
    const jwtPayload = tokenService.extractData(token);

    tokenService.checkJwtPayload(jwtPayload, (err: Error) => {

        if (err) return authenticateLog(err, false, callback);

        Users.getUsersWithRoles(['*'], { username: jwtPayload.username })
            .then(users => {

                const user = users[0];
                Promise.resolve(authenticateLog(null, user ? !user.reauth : false, callback))

            })
            .catch(err => Promise.resolve(authenticateLog(err, false, callback)))

    });

};

export default { socketStart }