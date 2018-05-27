import config from './internal/config'

import express = require('express')
import router from './routes/routes'
import {AddressInfo} from "net";

import logger from './internal/logger'
const log = logger(module);

const app = express();
app.set('view engine', 'ejs');

app.use(router);

const port = process.env.PORT || config.get(`network:${ process.env.appname }:port`) || 80;

const server = app.listen(port, () => {

    const { address, port, family } = server.address() as AddressInfo;
    log.info(`AUTH server listening at http://${ address }:${ port } ${ family }`)

});
