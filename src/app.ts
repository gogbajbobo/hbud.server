import config from './internal/config'
import express = require('express')
import router from './routes/routes'

const app = express();
app.use(router);

const port = process.env.PORT || config.get(`network:${ process.env.appname }:port`) || 80;

app.listen(port, () => {
    console.log(`AUTH server start on port:${ port }`);
});
