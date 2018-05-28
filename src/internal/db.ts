import config from './config'
import knex from 'knex'

import logger from './logger'
const log = logger(module);

const mysqlConfig = config.get('mysql');

log.debug(mysqlConfig);

const db = knex({
    client: 'mysql',
    connection: mysqlConfig,
    debug: false
});

export default db

export interface UserModel {
    id: number,
    username: string,
    role: string,
    reauth: boolean
}
