"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = __importDefault(require("../functions"));
const templateRoutes = (router, rootPath) => {
    const templatePath = `${rootPath}/template`;
    const templateIdPath = `${rootPath}/template/:id`;
    router.route([templatePath, templateIdPath])
        .all(functions_1.default.requireRoles(['admin']), (req, res, next) => next());
    router.route(templatePath)
        .get((req, res) => {
        res.status(501).json({ error: true, message: `Not Implemented` });
    })
        .post((req, res) => {
        res.status(501).json({ error: true, message: `Not Implemented` });
    });
    router.route(templateIdPath)
        .all((req, res, next) => {
        return (req.params.id)
            ? next()
            : res.status(400).json({ error: true, message: `have no id` });
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
exports.default = templateRoutes;
