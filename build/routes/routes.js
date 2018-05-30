"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const root_1 = __importDefault(require("./root"));
const register_1 = __importDefault(require("./register"));
const login_1 = __importDefault(require("./login"));
const router = express_1.Router();
router.route('*')
    .all((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //TODO: * — is dangerous?
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    }
    else {
        next();
    }
});
root_1.default(router);
register_1.default(router);
login_1.default(router);
router.route('*')
    .all((req, res) => res.status(404).end());
exports.default = router;
