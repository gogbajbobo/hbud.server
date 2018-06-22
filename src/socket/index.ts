import sio, {Socket} from 'socket.io'
const sio_auth = require('socketio-auth');

import logger from '../internal/logger'
import * as http from "http";
const log = logger(module);

function socketStart(server: http.Server) {

    const io = sio(server);

    sio_auth(io, {
        authenticate: function (socket: Socket, data: any, callback: Function) {

            console.log(`recive ${ data }`);
            return callback(new Error("User not found"))

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

        log.info(`socket connected ${ socket.id }`);

        const authTimer = setTimeout(() => socket.disconnect(true), 1000);

        socket.on('authorize', (data, ack) => {

            if (!data.token) {

                const msg = `no token`;
                log.info(msg);
                ack(msg);

                return

            }

            log.debug(`authorize ${ JSON.stringify(data) }`);
            clearTimeout(authTimer)

        });

        socket.on('disconnect', () => {
            log.info(`disconnect socket ${ socket.id }`);
        })

    });

}

export default { socketStart }