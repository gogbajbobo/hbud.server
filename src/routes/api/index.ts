import { Router } from 'express'

import usersRoutes from './users'
import passport from "../../internal/passport";

const apiPath = '/api';

const apiRoutes = (router: Router) => {

    router.route(`${ apiPath }/*`)
        .all(passport.authenticate('jwt'), (req, res, next) => next());

    usersRoutes(router, apiPath);

};

export default apiRoutes
