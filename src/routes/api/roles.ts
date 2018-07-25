import { Router } from 'express'

import fn from '../functions'
import Roles from "../../internal/db/roles";

const rolesRoutes = (router: Router, rootPath: string) => {

    const rolesPath = `${ rootPath }/roles`;
    const rolesIdPath = `${ rootPath }/roles/:id`;

    router.route([rolesPath, rolesIdPath])
        .all(fn.requireRoles(['admin']), (req, res, next) => next());

    router.route(rolesPath)

        .get((req, res) => {

            Roles.getRoles()
                .then(roles => res.status(200).json({ error: false, roles }))
                .catch(err => fn.catchErr(err, res))

        })

        .post((req, res) => {
            res.status(501).json({error: true, message: `Not Implemented`})
        });


    router.route(rolesIdPath)

        .all((req, res, next) => {

            return (req.params.id)
                ? next()
                : res.status(400).json({error: true, message: `have no role's id`})

        })

        .get((req, res) => {
            res.status(501).json({error: true, message: `Not Implemented`})
        })

        .put((req, res) => {
            res.status(501).json({error: true, message: `Not Implemented`})
        })

        .delete((req, res) => {
            res.status(501).json({error: true, message: `Not Implemented`})
        })

};

export default rolesRoutes
