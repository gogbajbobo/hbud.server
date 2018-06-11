"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = __importDefault(require("../functions"));
const usersRoutes = (router, rootPath) => {
    const rolesPath = `${rootPath}/roles`;
    const rolesIdPath = `${rootPath}/roles/:id`;
    router.route([rolesPath, rolesIdPath])
        .all(functions_1.default.requireRoles(['admin']), (req, res, next) => next());
    router.route(rolesPath)
        .get((req, res) => {
        res.status(501).json({ error: true, message: `Not Implemented` });
    });
    router.route(rolesIdPath)
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
exports.default = usersRoutes;
