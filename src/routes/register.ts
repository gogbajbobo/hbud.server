import { Router, Request, Response, NextFunction } from 'express'
import db from '../internal/db'
import bcrypt from 'bcryptjs'
import passport from '../internal/passport'

function requireRole(role: string) {

    return (req: Request, res: Response, next: NextFunction) => {

        console.log(req.user);

        req.user
            ? role.includes(req.user.role)
                ? next()
                : res.status(401).send('Unauthorized').end()
            : res.status(403).send('Forbidden').end()

    }

}

const registerRoute = (router: Router) => {

    router.route('/register')

        .get(passport.authenticate('jwt'), requireRole('admin'), (req, res) => res.render('register'))

        .post(passport.authenticate('jwt'), requireRole('admin'), (req, res) => {

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

        .get(passport.authenticate('jwt'), requireRole('admin'), (req, res) => {

            db('users')
                .select()
                .then(result => res.json(result))
                .catch(err => res.status(500).json({error: true, message: err.toLocaleString()}))

        })

};

export default registerRoute

