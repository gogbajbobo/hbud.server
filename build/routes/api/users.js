"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../../internal/db"));
const users_1 = __importDefault(require("../../internal/db/users"));
const functions_1 = __importDefault(require("../functions"));
const usersRoutes = (router, rootPath) => {
    const usersPath = `${rootPath}/users`;
    const usersIdPath = `${rootPath}/users/:id`;
    router.route([usersPath, usersIdPath])
        .all(functions_1.default.requireRoles(['admin']), (req, res, next) => next());
    router.route(usersPath)
        .get((req, res) => {
        users_1.default.getUsersWithRoles(['id', 'username'])
            .then(users => res.status(200).json({ error: false, users }))
            .catch(err => functions_1.default.catchErr(err, res));
    })
        .post((req, res) => {
        res.status(501).json({ error: true, message: `Not Implemented` });
    });
    router.route(usersIdPath)
        .all((req, res, next) => {
        return (req.params.id)
            ? next()
            : res.status(400).json({ error: true, message: `have no user's id` });
    })
        .get((req, res) => {
        const id = req.params.id;
        users_1.default.getUsersWithRoles(['id', 'username'], { id })
            .then(result => res.status(200).json({ error: false, user: result[0] }))
            .catch(err => functions_1.default.catchErr(err, res));
    })
        .put((req, res) => {
        const id = req.params.id;
        const { username, password, roles } = req.body;
        if (password) {
            bcryptjs_1.default.hash(password, 10, (err, hash) => {
                const data = {
                    username,
                    roles,
                    hash
                };
                functions_1.default.updateObject('users', id, data, res);
            });
        }
        else {
            functions_1.default.updateObject('users', id, { username, roles }, res);
        }
    })
        .delete((req, res) => {
        const id = req.params.id;
        db_1.default('users')
            .delete()
            .where({ id })
            .then(() => res.status(200).json({ error: false }))
            .catch(err => functions_1.default.catchErr(err, res));
    });
};
exports.default = usersRoutes;
