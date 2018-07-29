"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
const subaccountsTable = 'subaccounts';
class Subaccounts {
    static getSubaccounts(user_id) {
        return _1.default(subaccountsTable).select().where({ user_id });
    }
    static addSubccount(name, account_id, user_id) {
        return _1.default(subaccountsTable).insert({ name, account_id, user_id });
    }
}
exports.default = Subaccounts;
