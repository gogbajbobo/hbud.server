"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("./cors"));
const root_1 = __importDefault(require("./root"));
const commonRoutes = (router) => {
    cors_1.default(router);
    root_1.default(router);
};
exports.default = commonRoutes;
