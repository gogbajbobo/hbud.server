"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./internal/config"));
const express = require("express");
const app = express();
const port = process.env.PORT || config_1.default.get(`network:${process.env.appname}:port`) || 80;
app.listen(port, () => {
    console.log(`AUTH server start on port:${port}`);
});
