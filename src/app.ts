import config from './internal/config'

import express = require('express')
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

const server = app.listen(port, host, () => {

    const { address, port, family } = server.address() as AddressInfo;
    log.info(`HBUD server listening at http://${ address }:${ port } ${ family }`)

});
