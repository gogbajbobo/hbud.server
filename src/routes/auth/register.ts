import { Router, Request, Response, NextFunction } from 'express'

import bcrypt from 'bcryptjs'

import db from '../../internal/db'
import passport from '../../internal/passport'
import fn from '../functions'

const registerRoute = (router: Router, rootPath: string) => {

    router.route(`${ rootPath }/register`)

        .all(passport.authenticate('jwt'), fn.requireRole('admin'))

        .get((req, res) => res.render('register'))

        .post((req, res) => {

            const {username, password} = req.body;

            if (!username || !password)
                return res.status(400).json({error: true, code: 400, message: 'Bad Request'});

            const role = req.body.role || 'visitor';

            bcrypt.hash(password, 10, (err, hash) => {

                db('users')
                    .insert({
                        username,
                        hash,
                        role
                    })
                    .then(result => res.json(result))
                    .catch(err => fn.catchErr(err, res))

            })

        })

};

export default registerRoute

