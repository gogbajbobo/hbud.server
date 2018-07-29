import db from './'

const accountsTable = 'accounts';

class Accounts {

    static getAccounts(user_id: number) {
        return db(accountsTable).select().where({ user_id })
    }

    static addAccount(user_id: number, name: string, type_id: number) {
        return db(accountsTable).insert({ name, type_id, user_id })
    }

    static deleteAccount(id: number) {
        return db(accountsTable).delete().where({ id })
    }

    static updateAccount(id: number, user_id: number, name: string, type_id: number) {
        return db(accountsTable).update({ name, type_id }).where({ id, user_id })
    }

}

export default Accounts