"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../internal/db"));
function requireRole(role) {
    return (req, res, next) => {
        req.user
            ? role.includes(req.user.role)
                ? next()
                : res.status(401).send('Unauthorized').end()
            : res.status(403).send('Forbidden').end();
    };
}
function catchErr(err, res) {
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
    requireRole,
    catchErr,
    updateObject
};
