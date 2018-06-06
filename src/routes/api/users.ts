import { Router } from 'express'

import bcrypt from 'bcryptjs'

import db from '../../internal/db'
import fn from '../functions'

const usersRoutes = (router: Router, rootPath: string) => {

    router.route(`${ rootPath }/users`)

        .get(fn.requireRole('admin'), (req, res) => {

            db('users')
                .select(['id', 'username', 'role'])
                .then(users => res.status(200).json({ error: false, users: users }))
                .catch(err => fn.catchErr(err, res))

        });

    router.route(`${ rootPath }/users/:id`)

        .get(fn.requireRole(['admin', 'user']), (req, res) => {

            const id = req.params.id || 0;

            db('users')
                .select(['id', 'username', 'role'])
                .where({ id })
                .then(result => res.status(200).json({ error: false, user: result[0] }))
                .catch(err => fn.catchErr(err, res))

        })

        .put(fn.requireRole('admin'), (req, res) => {

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

        .delete(fn.requireRole('admin'), (req, res) => {

            const id = req.params.id || 0;

            db('users')
                .delete()
                .where({ id })
                .then(() => res.status(200).json({ error: false }))
                .catch(err => fn.catchErr(err, res))

        })

};

export default usersRoutes
