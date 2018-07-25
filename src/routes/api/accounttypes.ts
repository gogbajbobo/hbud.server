import { Router } from 'express'
import fn from '../functions'

const accountTypesRoutes = (router: Router, rootPath: string) => {

    const accountTypesPath = `${ rootPath }/accounttypes`;
    const accountTypesIdPath = `${ rootPath }/accounttypes/:id`;

    router.route([accountTypesPath, accountTypesIdPath])
        .all(fn.requireRoles(['admin']), (req, res, next) => next());

    router.route(accountTypesPath)

        .get((req, res) => {
            res.status(501).json({error: true, message: `Not Implemented`})
        })

        .post((req, res) => {
            res.status(501).json({error: true, message: `Not Implemented`})
        });

    router.route(accountTypesIdPath)

        .all((req, res, next) => {

            return (req.params.id)
                ? next()
                : res.status(400).json({error: true, message: `have no id`})

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

export default accountTypesRoutes
