import { Router } from 'express'

import passport from "../../internal/passport"

import usersRoutes from './users'
import rolesRoutes from './roles'
import accountTypesRoutes from './accounttypes'
import accountsRoutes from './accounts'
import subaccountsRoutes from './subaccounts'

const apiPath = '/api';

const apiRoutes = (router: Router) => {

    router.route(`${ apiPath }/*`)
        .all(passport.authenticate('jwt'), (req, res, next) => next());

    usersRoutes(router, apiPath);
    rolesRoutes(router, apiPath);
    accountTypesRoutes(router, apiPath);
    accountsRoutes(router, apiPath);
    subaccountsRoutes(router, apiPath)

};

export default apiRoutes
