import { Router } from 'express';
import rootRoute from './root'
import registerRoute from './register'
import loginRoute from './login'

const router = Router();

router.route('*')
    .all((req, res, next) => {

        res.header("Access-Control-Allow-Origin", "*"); //TODO: * — is dangerous?
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');

        if (req.method === 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }

    });

rootRoute(router);
registerRoute(router);
loginRoute(router);

router.route('*')
    .all((req, res) => res.status(404).end());

export default router
