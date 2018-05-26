import { Router } from 'express'

const registerRoute = (router: Router) => {

    router.route('/register')
        .post((req, res) => res.json({ info: 'hbud.api register' }))


};

export default registerRoute
