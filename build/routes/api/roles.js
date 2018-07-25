"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = __importDefault(require("../functions"));
const roles_1 = __importDefault(require("../../internal/db/roles"));
const rolesRoutes = (router, rootPath) => {
    const rolesPath = `${rootPath}/roles`;
    const rolesIdPath = `${rootPath}/roles/:id`;
    router.route([rolesPath, rolesIdPath])
        .all(functions_1.default.requireRoles(['admin']), (req, res, next) => next());
    router.route(rolesPath)
        .get((req, res) => {
        roles_1.default.getRoles()
            .then(roles => res.status(200).json({ error: false, roles }))
            .catch(err => functions_1.default.catchErr(err, res));
    })
        .post((req, res) => {
        res.status(501).json({ error: true, message: `Not Implemented` });
    });
    router.route(rolesIdPath)
        .all((req, res, next) => {
        return (req.params.id)
            ? next()
            : res.status(400).json({ error: true, message: `have no role's id` });
    })
        .get((req, res) => {
        res.status(501).json({ error: true, message: `Not Implemented` });
    })
        .put((req, res) => {
        res.status(501).json({ error: true, message: `Not Implemented` });
    })
        .delete((req, res) => {
        res.status(501).json({ error: true, message: `Not Implemented` });
    });
};
exports.default = rolesRoutes;
