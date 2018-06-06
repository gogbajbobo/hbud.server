"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("../internal/passport"));
const token_1 = __importDefault(require("../internal/token"));
const loginRoute = (router) => {
    router.route('/login')
        .post(passport_1.default.authenticate('local'), (req, res) => {
        res.json(token_1.default.invokeToken(req.user, 'Login success'));
    });
    router.route('/token')
        .get(passport_1.default.authenticate('jwt'), (req, res) => {
        res.json(token_1.default.invokeToken(req.user, 'Token exchange successfully'));
    });
    router.route('/logout')
        .post(passport_1.default.authenticate('jwt'), (req, res) => {
        res.json({ error: false, message: 'logout success' });
    });
};
exports.default = loginRoute;
