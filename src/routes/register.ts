import { Router } from 'express'
import db from '../internal/db'

const registerRoute = (router: Router) => {

    router.route('/register')
        .get((req, res) => res.render('register'))
        .post((req, res) => res.json({ info: 'hbud.api register post' }))

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
