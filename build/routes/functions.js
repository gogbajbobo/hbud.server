"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../internal/db"));
const logger_1 = __importDefault(require("../internal/logger"));
const log = logger_1.default(module);
function requireRoles(requiredRoles) {
    return (req, res, next) => {
        if (!req.user)
            return res.status(401).send('Unauthorized').end();
        req.user.roles.split(',').some((role) => requiredRoles.includes(role))
            ? next()
            : res.status(403).send('Forbidden').end();
    };
}
function catchErr(err, res) {
    log.debug(err.message);
    res.status(500).json({ error: true, message: err.message });
}
function updateObject(table, id, data, res) {
    db_1.default(table)
        .update(data)
        .where({ id })
        .then(() => res.status(200).json({ error: false }))
        .catch(err => catchErr(err, res));
}
exports.default = {
    requireRoles,
    catchErr,
    updateObject
};
