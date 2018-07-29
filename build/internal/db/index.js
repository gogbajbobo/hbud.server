"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const knex_1 = __importDefault(require("knex"));
const logger_1 = __importDefault(require("../logger"));
const log = logger_1.default(module), mysqlConfig = config_1.default.get('mysql');
log.debug(mysqlConfig);
const db = knex_1.default({
    client: 'mysql',
    connection: mysqlConfig,
    debug: false
});
exports.default = db;
function updateDBObject(table, id, data) {
    return db(table).update(data).where({ id });
}
exports.updateDBObject = updateDBObject;
