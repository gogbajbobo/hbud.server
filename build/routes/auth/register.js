"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../../internal/db"));
const passport_1 = __importDefault(require("../../internal/passport"));
const functions_1 = __importDefault(require("../functions"));
const registerRoute = (router, rootPath) => {
    router.route(`${rootPath}/register`)
        .all(passport_1.default.authenticate('jwt'), functions_1.default.requireRole('admin'))
        .get((req, res) => res.render('register'))
        .post((req, res) => {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ error: true, code: 400, message: 'Bad Request' });
        const role = req.body.role || 'visitor';
        bcryptjs_1.default.hash(password, 10, (err, hash) => {
            db_1.default('users')
                .insert({
                username,
                hash,
                role
            })
                .then(result => res.json(result))
                .catch(err => functions_1.default.catchErr(err, res));
        });
    });
};
exports.default = registerRoute;
