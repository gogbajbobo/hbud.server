"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
function invokeToken(user, message) {
    const tokenLifetime = 2 * 24 * 60 * 60; // seconds
    const expirationTime = Math.floor(Date.now() / 1000) + tokenLifetime;
    const userData = {
        username: user.username,
        role: user.role,
        id: user.id,
        exp: expirationTime
    };
    const accessToken = jsonwebtoken_1.default.sign(userData, config_1.default.get('jwt:secretKey'));
    return {
        error: false,
        message: message || 'Token invoked successfully',
        user: userData,
        accessToken,
        expirationTime
    };
}
exports.default = { invokeToken };
