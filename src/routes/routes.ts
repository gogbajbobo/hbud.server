import { Router } from 'express';
import rootRoute from './root'
import registerRoute from './register'

const router = Router();

rootRoute(router);
registerRoute(router);

export default router
