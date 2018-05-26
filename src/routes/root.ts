import { Router } from 'express'

const rootRoute = (router: Router) => {

    router.route('/')
        .get((req, res) => res.json({ info: 'hbud.api' }));


};

export default rootRoute;