"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiPath = '/api';
const apiRoutes = (router) => {
    router.route(`${apiPath}/*`)
        .all((req, res, next) => next());
};
exports.default = apiRoutes;
