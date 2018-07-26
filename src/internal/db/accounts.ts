import db from './'

class Accounts {

    static getAccounts(userId: number) {
        return db('accounts').select().where({ user_id: userId })
    }

    static addAccount(name: string, typeId: number, userId: number) {

        const data = {
            name,
            type_id: typeId,
            user_id: userId
        };

        return db('accounts').insert(data)

    }

}

export default Accounts