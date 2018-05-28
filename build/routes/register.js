"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../internal/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_1 = __importDefault(require("../internal/passport"));
function requireRole(role) {
    return (req, res, next) => {
        console.log(req.user);
        req.user
            ? role.includes(req.user.role)
                ? next()
                : res.status(401).send('Unauthorized').end()
            : res.status(403).send('Forbidden').end();
    };
}
const registerRoute = (router) => {
    router.route('/register')
        .get(passport_1.default.authenticate('jwt'), requireRole('admin'), (req, res) => res.render('register'))
        .post(passport_1.default.authenticate('jwt'), requireRole('admin'), (req, res) => {
        const { username, password } = req.body;
        const role = req.body.role || 'visitor';
        if (!username || !password)
            return res.status(400).json({ error: true, code: 400, message: 'Bad Request' });
        bcryptjs_1.default.hash(password, 10, (err, hash) => {
            db_1.default('users')
                .insert({
                username,
                hash,
                role
            })
                .then(result => res.json(result))
                .catch(err => res.status(500).json({ error: true, message: err.toLocaleString() }));
        });
    });
    router.route('/users')
        .get(passport_1.default.authenticate('jwt'), requireRole('admin'), (req, res) => {
        db_1.default('users')
            .select()
            .then(result => res.json(result))
            .catch(err => res.status(500).json({ error: true, message: err.toLocaleString() }));
    });
};
exports.default = registerRoute;
