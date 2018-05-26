"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.route('/')
    .get((req, res) => res.status(200).json({ api: 'hbud.api' }));
exports.default = router;
