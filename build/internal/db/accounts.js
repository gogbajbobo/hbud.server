"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
class Accounts {
    static getAccounts(userId) {
        return _1.default('accounts').select().where({ user_id: userId });
    }
}
exports.default = Accounts;
