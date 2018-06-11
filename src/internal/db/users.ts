import db from './'
import {any} from "nconf";

class Users {

    static getUsersWithRoles(select: string[], where?: any) {

        const selectMap = select.map(field => `u.${ field }`);

        let query = db('users as u')
            .select(db.raw(`??, group_concat(distinct ?? separator ',') as roles`, [selectMap, 'r.rolename']))
            .innerJoin('users_roles as u_r','u.id', '=', 'u_r.users_id')
            .innerJoin('roles as r', 'u_r.roles_id', '=', 'r.id')
            .groupBy('u.id');

        if (where) {

            let whereMap: any = {};
            Object.keys(where).forEach(key => whereMap[`u.${ key }`] = where[key]);

            query = query.where(whereMap);

        }

        return query

    }

}

export default Users;