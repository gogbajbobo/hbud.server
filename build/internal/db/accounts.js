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
    static addAccount(name, typeId, userId) {
        const data = {
            name,
            type_id: typeId,
            user_id: userId
        };
        return _1.default('accounts').insert(data);
    }
}
exports.default = Accounts;
