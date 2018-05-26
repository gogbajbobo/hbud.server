"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerRoute = (router) => {
    router.route('/register')
        .post((req, res) => res.json({ info: 'hbud.api register' }));
};
exports.default = registerRoute;
