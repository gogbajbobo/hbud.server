"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = __importDefault(require("../functions"));
const subaccounts_1 = __importDefault(require("../../internal/db/subaccounts"));
const subaccountsRoutes = (router, rootPath) => {
    const subaccountsPath = `${rootPath}/subaccounts`;
    const subaccountsIdPath = `${rootPath}/subaccounts/:id`;
    router.route([subaccountsPath, subaccountsIdPath])
        .all(functions_1.default.requireRoles(['admin', 'user']), (req, res, next) => next());
    router.route(subaccountsPath)
        .get((req, res) => {
        subaccounts_1.default.getSubaccounts(req.user.id)
            .then(subaccounts => res.status(200).json({ error: false, subaccounts }))
            .catch(err => functions_1.default.catchErr(err, res));
    })
        .post((req, res) => {
        const { name, accountId } = req.body;
        if (!name || !accountId)
            return res.status(400).json({ error: true, code: 400, message: 'Bad Request' });
        subaccounts_1.default.addSubccount(name, accountId, req.user.id)
            .then(subaccounts => res.status(200).json({ error: false, subaccounts }))
            .catch(err => functions_1.default.catchErr(err, res));
    });
    router.route(subaccountsIdPath)
        .all((req, res, next) => {
        return (req.params.id)
            ? next()
            : res.status(400).json({ error: true, message: `have no id` });
    })
        .get(functions_1.default.notImplemented)
        .put(functions_1.default.notImplemented)
        .delete(functions_1.default.notImplemented);
};
exports.default = subaccountsRoutes;
