import { Router } from 'express'

import commonRoutes from './common'
import authRoutes from './auth'
import apiRoutes from './api'

const router = Router();

commonRoutes(router);
authRoutes(router);
apiRoutes(router);

router.route('*')
    .all((req, res) => res.status(404).end());

export default router
