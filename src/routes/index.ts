import { Router } from 'express'

import commonRoutes from './common'
import authRoutes from './auth'

const router = Router();

commonRoutes(router);
authRoutes(router);

router.route('*')
    .all((req, res) => res.status(404).end());

export default router
