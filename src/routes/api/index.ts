import { Router } from 'express'

import passport from "../../internal/passport"

import usersRoutes from './users'
import rolesRoutes from './roles'
import accountTypesRoutes from './accounttypes'

const apiPath = '/api';

const apiRoutes = (router: Router) => {

    router.route(`${ apiPath }/*`)
        .all(passport.authenticate('jwt'), (req, res, next) => next());

    usersRoutes(router, apiPath);
    rolesRoutes(router, apiPath);
    accountTypesRoutes(router, apiPath)

};

export default apiRoutes
