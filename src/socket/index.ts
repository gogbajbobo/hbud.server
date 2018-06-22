import sio, {Socket} from 'socket.io'
import logger from '../internal/logger'
import * as http from "http"
import tokenService from '../internal/token'
import Users from "../internal/db/users";

const sio_auth = require('socketio-auth');
const redisClient = require('redis-js');
const log = logger(module);

function socketStart(server: http.Server) {

    const io = sio(server);
    sio_auth(io, { authenticate });
    io.on('connect', listener)

}

const listener = (socket: Socket): void => {

    log.info(`socket connected ${ socket.id }`);

    socket.on('authenticated', () => {
        log.debug(JSON.parse(redisClient.get(socket.id)).roles);
        log.info(`socket authenticated ${ socket.id }`)
    });

    socket.on('disconnect', () => {
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
    const jwtPayload = tokenService.extractData(token);

    tokenService.checkJwtPayload(jwtPayload, (err: Error) => {

        if (err) return authenticateLog(err, false, callback);

        Users.getUsersWithRoles(['*'], { username: jwtPayload.username })
            .then(users => {

                const user = users[0];

                redisClient.set(socket.id, JSON.stringify(user), (err: Error, reply: string) => {

                    if (err || reply !== 'OK') {
                        return Promise.resolve(authenticateLog(err, false, callback))
                    }

                    Promise.resolve(authenticateLog(null, user ? !user.reauth : false, callback))

                });

            })
            .catch(err => Promise.resolve(authenticateLog(err, false, callback)))

    });

};

export default { socketStart }