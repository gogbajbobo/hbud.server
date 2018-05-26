import { Router } from 'express';

const router = Router();

router.route('/')
    .get((req, res) => res.status(200).json({ api: 'hbud.api' }));

export default router;