"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./users"));
const passport_1 = __importDefault(require("../../internal/passport"));
const apiPath = '/api';
const apiRoutes = (router) => {
    router.route(`${apiPath}/*`)
        .all(passport_1.default.authenticate('jwt'), (req, res, next) => next());
    users_1.default(router, apiPath);
};
exports.default = apiRoutes;
