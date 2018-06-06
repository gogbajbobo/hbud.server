"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("./login"));
const register_1 = __importDefault(require("./register"));
const authPath = '/auth';
const authRoutes = (router) => {
    router.route('/auth/*')
        .all((req, res, next) => next());
    login_1.default(router, authPath);
    register_1.default(router, authPath);
};
exports.default = authRoutes;
