import db from './'

class Accounts {

    static getAccounts(userId: number) {
        return db('accounts').select().where({ user_id: userId })
    }

}

export default Accounts