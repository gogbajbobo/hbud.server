import db from './'

class Subaccounts {

    static getSubaccounts(userId: number) {
        return db('subaccounts').select().where({ user_id: userId })
    }

    static addSubccount(name: string, accountId: number, userId: number) {

        const data = {
            name,
            account_id: accountId,
            user_id: userId
        };

        return db('subaccounts').insert(data)

    }

}

export default Subaccounts