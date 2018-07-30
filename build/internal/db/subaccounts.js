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
    static addSubccount(user_id, name, account_id) {
        return _1.default(subaccountsTable).insert({ name, account_id, user_id });
    }
    static deleteSubaccount(id) {
        return _1.default(subaccountsTable).delete().where({ id });
    }
    static updateSubaccount(id, user_id, name, account_id) {
        return _1.default(subaccountsTable).update({ name, account_id }).where({ id, user_id });
    }
}
exports.default = Subaccounts;
