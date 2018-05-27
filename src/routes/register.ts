import { Router } from 'express'
import db from '../internal/db'
import bcrypt from 'bcryptjs'

const registerRoute = (router: Router) => {

    router.route('/register')

        .get((req, res) => res.render('register'))

        .post((req, res) => {

            const {username, password} = req.body;
            const role = req.body.role || 'visitor';

            if (!username || !password)
                return res.status(400).json({error: true, code: 400, message: 'Bad Request'});

            bcrypt.hash(password, 10, (err, hash) => {

                db('users')
                    .insert({
                        username,
                        hash,
                        role
                    })
                    .then(result => res.json(result))
                    .catch(err => res.status(500).json({error: true, message: err.toLocaleString()}))

            })

        });

    router.route('/users')

        .get((req, res) => {

            db('users')
                .select()
                .then(result => res.json(result))
                .catch(err => res.status(500).json({error: true, message: err.toLocaleString()}))

        })

};

export default registerRoute

    // .post(passport.authenticate('jwt'), requireRole('admin'), (req, res) => {
    //
    //     const { username, password } = req.body;
    //     const role = req.body.role || 'user';
    //
    //     bcrypt.hash(password, 10, (err, hash) => {
    //
    //         users
    //             .insert({
    //                 username,
    //                 hash,
    //                 role
    //             })
    //             .then(result => res.status(200).json(result))
    //             .catch(err => catchErr(err, res))
    //
    //     })
