import config from './internal/config'

import express from 'express'
import http from 'http'
import sio from 'socket.io'
import router from './routes'
import {AddressInfo} from "net";

const app = express();
app.set('view engine', 'ejs');

import logger from './internal/logger'
const log = logger(module);

import requestLogger from 'morgan'
config.get('env') === 'production' || app.use(requestLogger('dev'));

import responseFinished from './internal/response.interceptor'
app.use(responseFinished());

import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

import passport from './internal/passport'
app.use(passport.initialize());

app.use(router);

const port = config.get(`network:${ process.env.appname }:port`);
const host = config.get(`network:${ process.env.appname }:hostname`);

log.info(`appname: ${ process.env.appname }`);
log.info(`NODE_ENV: ${ process.env.NODE_ENV }`);
log.info(`host: ${ host } / port: ${ port }`);

const server = app.listen(port, host, () => {

    const { address, port, family } = server.address() as AddressInfo;
    log.info(`HBUD server listening at http://${ address }:${ port } ${ family }`)

});

const io = sio(server);

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
