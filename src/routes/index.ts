import { Router } from 'express'
import cors from './cors'
import rootRoute from './root'
import registerRoute from './register'
import loginRoute from './login'

const router = Router();

cors(router);

rootRoute(router);
registerRoute(router);
loginRoute(router);

router.route('*')
    .all((req, res) => res.status(404).end());

export default router
