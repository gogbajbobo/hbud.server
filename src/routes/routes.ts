import { Router } from 'express';
import rootRoute from './root'
import registerRoute from './register'

const router = Router();

rootRoute(router);
registerRoute(router);

router.route('*')
    .all((req, res) => res.status(404).end());

export default router
