"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../../internal/db"));
const roles_1 = __importDefault(require("../../internal/db/roles"));
const passport_1 = __importDefault(require("../../internal/passport"));
const functions_1 = __importDefault(require("../functions"));
const registerRoute = (router, rootPath) => {
    router.route(`${rootPath}/register`)
        .all(passport_1.default.authenticate('jwt'), functions_1.default.requireRoles(['admin']))
        .get((req, res) => {
        roles_1.default.getRoles()
            .then(roles => res.render('register', { roles }))
            .catch(err => functions_1.default.catchErr(err, res));
    })
        .post((req, res) => {
        const { username, password, roles } = req.body;
        if (!username || !password || !roles)
            return res.status(400).json({ error: true, code: 400, message: 'Bad Request' });
        bcryptjs_1.default.hash(password, 10, (err, hash) => {
            db_1.default.transaction(trx => {
                return trx
                    .insert({ username, hash })
                    .into('users')
                    .then(result => {
                    const checkedRoles = (roles instanceof Array) ? roles : [roles];
                    const userId = result[0], users_roles = checkedRoles.map((roleId) => {
                        return { users_id: userId, roles_id: roleId };
                    });
                    return trx
                        .insert(users_roles)
                        .into('users_roles');
                });
            })
                .then(result => res.json({ result }))
                .catch(err => functions_1.default.catchErr(err, res));
        });
    });
};
exports.default = registerRoute;
