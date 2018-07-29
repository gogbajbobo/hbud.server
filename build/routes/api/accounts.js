"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = __importDefault(require("../functions"));
const accounts_1 = __importDefault(require("../../internal/db/accounts"));
const accountsRoutes = (router, rootPath) => {
    const accountsPath = `${rootPath}/accounts`;
    const accountsIdPath = `${rootPath}/accounts/:id`;
    router.route([accountsPath, accountsIdPath])
        .all(functions_1.default.requireRoles(['admin', 'user']), (req, res, next) => next());
    router.route(accountsPath)
        .get((req, res) => {
        accounts_1.default.getAccounts(req.user.id)
            .then(accounts => res.status(200).json({ error: false, accounts }))
            .catch(err => functions_1.default.catchErr(err, res));
    })
        .post((req, res) => {
        const { name, type_id } = req.body;
        if (!name || !type_id)
            return res.status(400).json({ error: true, code: 400, message: 'Bad Request' });
        accounts_1.default.addAccount(req.user.id, name, type_id)
            .then(account => res.status(200).json({ error: false, account }))
            .catch(err => functions_1.default.catchErr(err, res));
    });
    router.route(accountsIdPath)
        .all((req, res, next) => {
        return (req.params.id)
            ? next()
            : res.status(400).json({ error: true, message: `have no id` });
    })
        .get(functions_1.default.notImplemented)
        .put((req, res) => {
        const id = req.params.id;
        const { name, type_id } = req.body;
        accounts_1.default.updateAccount(id, req.user.id, name, type_id)
            .then(() => res.status(200).json({ error: false }))
            .catch(err => functions_1.default.catchErr(err, res));
    })
        .delete((req, res) => {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ error: true, code: 400, message: 'Bad Request' });
        accounts_1.default.deleteAccount(id)
            .then(() => res.status(200).json({ error: false }))
            .catch(err => functions_1.default.catchErr(err, res));
    });
};
exports.default = accountsRoutes;
