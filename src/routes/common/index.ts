import { Router } from 'express'

import cors from './cors'
import rootRoute from './root'

const commonRoutes = (router: Router) => {

    cors(router);
    rootRoute(router);

};

export default commonRoutes
