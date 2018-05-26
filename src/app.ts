import config from './internal/config'
import express = require('express')
import router from './routes/routes'
import {AddressInfo} from "net";

const app = express();

app.use(router);

const port = process.env.PORT || config.get(`network:${ process.env.appname }:port`) || 80;

const server = app.listen(port, () => {

    const { address, port, family } = server.address() as AddressInfo;
    console.log(`AUTH server listening at http://${ address }:${ port } ${ family }`)

});
