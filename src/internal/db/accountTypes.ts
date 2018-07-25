import db from './'

class AccountTypes {

    static getAccountTypes() {
        return db('accounttypes').select()
    }

}

export default AccountTypes