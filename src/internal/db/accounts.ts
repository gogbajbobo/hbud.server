import db from './'

const accountsTable = 'accounts';

class Accounts {

    static getAccounts(user_id: number) {
        return db(accountsTable).select().where({ user_id })
    }

    static addAccount(name: string, type_id: number, user_id: number) {
        return db(accountsTable).insert({ name, type_id, user_id })
    }

    static deleteAccount(id: number) {
        return db(accountsTable).delete().where({ id })
    }

}

export default Accounts