import { Router } from 'express'

import bcrypt from 'bcryptjs'

import db from '../../internal/db'
import Roles from '../../internal/db/roles'
import passport from '../../internal/passport'
import fn from '../functions'

interface UsersRolesObject {
    users_id: number,
    roles_id: number
}

const registerRoute = (router: Router, rootPath: string) => {

    router.route(`${ rootPath }/register`)

        .all(passport.authenticate('jwt'), fn.requireRoles(['admin']))

        .get((req, res) => {

            Roles.getRoles()
                .then(roles => res.render('register', { roles }))
                .catch(err => fn.catchErr(err, res))

        })

        .post((req, res) => {

            const {username, password, roles} = req.body;

            if (!username || !password || !roles)
                return res.status(400).json({error: true, code: 400, message: 'Bad Request'});

            bcrypt.hash(password, 10, (err, hash) => {

                db.transaction(trx => {

                    return trx
                        .insert({ username, hash })
                        .into('users')
                        .then(result => {

                            const
                                userId: number = result[0],
                                users_roles: UsersRolesObject[] = roles.map((roleId: number) => {
                                    return { users_id: userId, roles_id: roleId }
                                });

                            return trx
                                .insert(users_roles)
                                .into('users_roles')
                                .then(result => console.log(result))
                                .catch(err => fn.catchErr(err, res));

                        })

                })
                .then(result => res.json({ result }))
                .catch(err => console.error(err.message))

            })

        })

};

export default registerRoute

