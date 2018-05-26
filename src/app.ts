import config from './internal/config'
import express = require('express')

const app = express();

const port = process.env.PORT || config.get(`network:${ process.env.appname }:port`) || 80;

app.listen(port, () => {
    console.log(`AUTH server start on port:${ port }`);
});
