"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rootRoute = (router) => {
    router.route('/')
        .get((req, res) => res.json({ info: 'hbud.server' }));
};
exports.default = rootRoute;
