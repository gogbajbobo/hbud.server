import db from './'

const subaccountsTable = 'subaccounts';

class Subaccounts {

    static getSubaccounts(user_id: number) {
        return db(subaccountsTable).select().where({ user_id })
    }

    static addSubccount(name: string, account_id: number, user_id: number) {
        return db(subaccountsTable).insert({ name, account_id, user_id })
    }

    static deleteSubaccount(id: number) {
        return db(subaccountsTable).delete().where({ id })
    }

    static updateSubaccount(id: number, user_id: number, name: string, account_id: number) {
        return db(subaccountsTable).update({ name, account_id }).where({ id, user_id })
    }

}

export default Subaccounts