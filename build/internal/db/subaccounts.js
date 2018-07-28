"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
class Subaccounts {
    static getSubaccounts(userId) {
        return _1.default('subaccounts').select().where({ user_id: userId });
    }
    static addSubccount(name, accountId, userId) {
        const data = {
            name,
            account_id: accountId,
            user_id: userId
        };
        return _1.default('subaccounts').insert(data);
    }
}
exports.default = Subaccounts;
