import db from './'

class Roles {

    static getRoles() {
        return db('roles').select()
    }

}

export default Roles