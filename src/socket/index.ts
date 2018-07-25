import sio, {Socket} from 'socket.io'
import logger from '../internal/logger'
import * as http from "http"
import tokenService from '../internal/token'
import Users from "../internal/db/users"
import socketUserCache, {SocketUser} from '../internal/cache'
import {UserModel} from "../internal/db"
import isPast from 'date-fns/is_past'

const sio_auth = require('socketio-auth');
const log = logger(module);

function socketStart(server: http.Server) {

    const io = sio(server);
    sio_auth(io, { authenticate });
    io.on('connect', listener)

}

function authenticate(socket: Socket, data: any, callback: Function) {

    const { token } = data;
    const tokenPayload = tokenService.extractData(token);

    tokenService.checkJwtPayload(tokenPayload, (err: Error) => {

        if (err) return authenticateLog(err, false, callback);

        Users.getUsersWithRoles(['*'], { username: tokenPayload.username })
            .then(users => {

                const
                    user = users[0],
                    userIsGood: boolean = user ? !user.reauth : false;

                userIsGood && socketUserCache.set(socket.id, { user, tokenPayload });

                Promise.resolve(authenticateLog(null, userIsGood, callback))

            })
            .catch(err => Promise.resolve(authenticateLog(err, false, callback)))

    })

}

function authenticateLog(err: Error|null, success: boolean, callback: Function) {

    if (!success) {
        log.error(err ? `Authentication error: ${ err.message }` : 'Authentication failure')
    }
    return callback(err, success)

}

function listener(socket: Socket): void {

    log.info(`socket connected ${ socket.id }`);

    socket.on('authenticated', () => socketAuthenticated(socket));

    socket.on('disconnect', () => {

        socketUserCache.del(socket.id);
        log.info(`disconnect socket ${ socket.id }`)

    })

}

function socketAuthenticated(socket: Socket) {

    const
        socketUserData: SocketUser = socketUserCache.get(socket.id),
        user: UserModel = socketUserData.user;

    log.info(`socket authenticated ${ socket.id } | ${ user.username }`);

    socketUseTokenTTLCheck(socket);
    socketRoutes(socket);

}

function socketUseTokenTTLCheck(socket: Socket) {

    socket.use((packet, next) => {

        if (isTokenExpire(socket.id)) {

            socket.emit('unauthorized', { message: 'token expire' });
            return socket.disconnect(true)

        }

        next()

    })

}

function isTokenExpire(socketId: string|number): boolean {

    const socketUserData: SocketUser = socketUserCache.get(socketId);
    return isPast(new Date(socketUserData.tokenPayload.exp * 1000))

}

function socketRoutes(socket: Socket) {

    socket.on('test', (ack: Function) => {

        console.log('test event');
        ack()

    });

}

export default { socketStart }