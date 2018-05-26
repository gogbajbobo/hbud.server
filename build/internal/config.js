"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nconf_1 = __importDefault(require("nconf"));
nconf_1.default
    .file('../../hbud.config.json');
nconf_1.default.get('env') && (process.env.NODE_ENV = nconf_1.default.get('env'));
process.env.appname = 'auth';
exports.default = nconf_1.default;
