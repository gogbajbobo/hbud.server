import { Router } from 'express'

import passport from '../../internal/passport'
import { UserModel } from "../../internal/db";
import token from '../../internal/token'

const loginRoute = (router: Router, rootPath: string) => {

    router.route(`${ rootPath }/login`)
        .post(passport.authenticate('local'), (req, res) => {
            res.json(token.invokeToken(req.user as UserModel, 'Login success'))
        });

    router.route(`${ rootPath }/token`)
        .get(passport.authenticate('jwt'), (req, res) => {
            res.json(token.invokeToken(req.user as UserModel, 'Token exchange successfully'))
        });

    router.route(`${ rootPath }/logout`)
        .post(passport.authenticate('jwt'), (req, res) => {
            res.json({ error: false, message: 'logout success' })
        });

};

export default loginRoute
