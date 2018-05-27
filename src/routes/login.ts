import { Router } from 'express'
import passport from '../internal/passport'

const loginRoute = (router: Router) => {

    router.route('/login')
        .post(passport.authenticate('local'), (req, res) => res.json({ error: false, message: 'login success'}));

    router.route('/logout')
        .post(passport.authenticate('jwt'), (req, res) => res.json({ error: false, message: 'logout success' }));

};

export default loginRoute
