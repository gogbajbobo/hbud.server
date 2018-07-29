import config from '../config'
import knex from 'knex'

import logger from '../logger'

const
    log = logger(module),
    mysqlConfig = config.get('mysql');

log.debug(mysqlConfig);

const db = knex({
    client: 'mysql',
    connection: mysqlConfig,
    debug: false
});

export default db

export function updateDBObject(table: string, id: number, data: any) {
    return db(table).update(data).where({ id })
}

export interface UserModel {
    id: number,
    username: string,
    roles: string,
    reauth: boolean
}
