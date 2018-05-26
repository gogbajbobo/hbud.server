import { Router } from 'express';

const router = Router();

router.route('/')
    .get((req, res) => {

        const jsonData: Object = {
            error: false,
            message: 'OK!',
            uri: process.env.SCRIPT_URI || 'localhost',
            env: process.env
        };
        res.status(200).json(jsonData);

    });

export default router;