"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.route('/')
    .get((req, res) => {
    const jsonData = {
        error: false,
        message: 'OK!',
        uri: process.env.SCRIPT_URI || 'localhost',
        env: process.env
    };
    res.status(200).json(jsonData);
});
exports.default = router;
