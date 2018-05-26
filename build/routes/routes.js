"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const root_1 = __importDefault(require("./root"));
const register_1 = __importDefault(require("./register"));
const router = express_1.Router();
root_1.default(router);
register_1.default(router);
exports.default = router;
