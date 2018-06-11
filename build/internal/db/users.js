"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
class Users {
    static getUsersWithRoles(select, where) {
        const selectMap = select.map(field => `u.${field}`);
        let query = _1.default('users as u')
            .select(_1.default.raw(`??, group_concat(distinct ?? separator ',') as roles`, [selectMap, 'r.rolename']))
            .innerJoin('users_roles as u_r', 'u.id', '=', 'u_r.users_id')
            .innerJoin('roles as r', 'u_r.roles_id', '=', 'r.id')
            .groupBy('u.id');
        if (where) {
            let whereMap = {};
            Object.keys(where).forEach(key => whereMap[`u.${key}`] = where[key]);
            query = query.where(whereMap);
        }
        return query;
    }
}
exports.default = Users;
