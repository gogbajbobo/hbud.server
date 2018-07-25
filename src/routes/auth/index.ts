import { Router } from 'express'

import loginRoute from './login'
import registerRoute from './register'

const authPath = '/auth';

const authRoutes = (router: Router) => {

    router.route(`${ authPath }/*`)
        .all((req, res, next) => next());

    loginRoute(router, authPath);
    registerRoute(router, authPath)

};

export default authRoutes
