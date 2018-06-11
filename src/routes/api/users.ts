import { Router } from 'express'

import bcrypt from 'bcryptjs'

import db from '../../internal/db'
import Users from '../../internal/db/users'
import fn from '../functions'

const usersRoutes = (router: Router, rootPath: string) => {

    const usersPath = `${ rootPath }/users`;
    const usersIdPath = `${ rootPath }/users/:id`;

    router.route([usersPath, usersIdPath])
        .all(fn.requireRoles(['admin']), (req, res, next) => next());

    router.route(usersPath)

        .get((req, res) => {

            Users.getUsersWithRoles(['id', 'username'])
                .then(users => res.status(200).json({ error: false, users }))
                .catch(err => fn.catchErr(err, res))

        });

    router.route(usersIdPath)

        .get((req, res) => {

            const id = req.params.id || 0;

            Users.getUsersWithRoles(['id', 'username'], { id })
                .then(result => res.status(200).json({ error: false, user: result[0] }))
                .catch(err => fn.catchErr(err, res))

        })

        .put((req, res) => {

            const id = req.params.id;

            if (!id)
                return res.status(400).json({error: true, message: `have no user's id`});

            const { username, password, role } = req.body;

            if (password) {

                bcrypt.hash(password, 10, (err, hash) => {

                    const data = {
                        username,
                        role,
                        hash
                    };

                    fn.updateObject('users', id, data, res)

                })

            } else {
                fn.updateObject('users', id, {username, role}, res)
            }


        })

        .delete((req, res) => {

            const id = req.params.id || 0;

            //TODO: check users_roles delete as well

            db('users')
                .delete()
                .where({ id })
                .then(() => res.status(200).json({ error: false }))
                .catch(err => fn.catchErr(err, res))

        })

};

export default usersRoutes
