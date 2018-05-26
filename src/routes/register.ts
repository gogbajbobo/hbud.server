import { Router } from 'express'

const registerRoute = (router: Router) => {

    router.route('/register')
        .get((req, res) => res.json({ info: 'hbud.api register' }))


};

export default registerRoute
