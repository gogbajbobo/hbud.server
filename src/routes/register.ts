import { Router } from 'express'
import db from '../internal/db'

const registerRoute = (router: Router) => {

    router.route('/register')

        .get((req, res) => res.render('register'))

        .post((req, res) => {

            console.log(req.body);

            const { username, password } = req.body;
            const role = req.body.role || 'visitor';

            if (!username || !password)
                return res.status(400).json({error: true, code: 400});

            res.json({ info: 'hbud.api register post', username, password, role })

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
