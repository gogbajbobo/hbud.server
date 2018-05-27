"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./internal/config"));
const express = require("express");
const routes_1 = __importDefault(require("./routes/routes"));
const app = express();
app.set('view engine', 'ejs');
const logger_1 = __importDefault(require("./internal/logger"));
const log = logger_1.default(module);
const morgan_1 = __importDefault(require("morgan"));
config_1.default.get('env') === 'production' || app.use(morgan_1.default('dev'));
const response_interceptor_1 = __importDefault(require("./internal/response.interceptor"));
app.use(response_interceptor_1.default());
const body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(routes_1.default);
const port = process.env.PORT || config_1.default.get(`network:${process.env.appname}:port`) || 80;
const server = app.listen(port, () => {
    const { address, port, family } = server.address();
    log.info(`AUTH server listening at http://${address}:${port} ${family}`);
});
