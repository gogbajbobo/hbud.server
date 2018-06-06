import { Router } from 'express'

const apiPath = '/api';

const apiRoutes = (router: Router) => {

    router.route(`${ apiPath }/*`)
        .all((req, res, next) => next())

};

export default apiRoutes
