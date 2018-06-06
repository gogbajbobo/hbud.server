"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const common_1 = __importDefault(require("./common"));
const auth_1 = __importDefault(require("./auth"));
const router = express_1.Router();
common_1.default(router);
auth_1.default(router);
router.route('*')
    .all((req, res) => res.status(404).end());
exports.default = router;
