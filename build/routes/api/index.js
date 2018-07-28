"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("../../internal/passport"));
const users_1 = __importDefault(require("./users"));
const roles_1 = __importDefault(require("./roles"));
const accounttypes_1 = __importDefault(require("./accounttypes"));
const accounts_1 = __importDefault(require("./accounts"));
const subaccounts_1 = __importDefault(require("./subaccounts"));
const apiPath = '/api';
const apiRoutes = (router) => {
    router.route(`${apiPath}/*`)
        .all(passport_1.default.authenticate('jwt'), (req, res, next) => next());
    users_1.default(router, apiPath);
    roles_1.default(router, apiPath);
    accounttypes_1.default(router, apiPath);
    accounts_1.default(router, apiPath);
    subaccounts_1.default(router, apiPath);
};
exports.default = apiRoutes;
