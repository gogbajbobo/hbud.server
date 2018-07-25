"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = __importDefault(require("../functions"));
const accountTypes_1 = __importDefault(require("../../internal/db/accountTypes"));
const accountTypesRoutes = (router, rootPath) => {
    const accountTypesPath = `${rootPath}/accounttypes`;
    const accountTypesIdPath = `${rootPath}/accounttypes/:id`;
    router.route([accountTypesPath, accountTypesIdPath])
        .all(functions_1.default.requireRoles(['admin']), (req, res, next) => next());
    router.route(accountTypesPath)
        .get((req, res) => {
        accountTypes_1.default.getAccountTypes()
            .then(accountTypes => res.status(200).json({ error: false, accountTypes }))
            .catch(err => functions_1.default.catchErr(err, res));
    })
        .post(functions_1.default.notImplemented);
    router.route(accountTypesIdPath)
        .all((req, res, next) => {
        return (req.params.id)
            ? next()
            : res.status(400).json({ error: true, message: `have no id` });
    })
        .get(functions_1.default.notImplemented)
        .put(functions_1.default.notImplemented)
        .delete(functions_1.default.notImplemented);
};
exports.default = accountTypesRoutes;
