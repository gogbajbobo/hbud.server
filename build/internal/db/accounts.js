"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
const accountsTable = 'accounts';
class Accounts {
    static getAccounts(user_id) {
        return _1.default(accountsTable).select().where({ user_id });
    }
    static addAccount(name, type_id, user_id) {
        return _1.default(accountsTable).insert({ name, type_id, user_id });
    }
    static deleteAccount(id) {
        return _1.default(accountsTable).delete().where({ id });
    }
}
exports.default = Accounts;
