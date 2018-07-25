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

        .post(fn.notImplemented);

    router.route(accountTypesIdPath)

        .all((req, res, next) => {

            return (req.params.id)
                ? next()
                : res.status(400).json({error: true, message: `have no id`})

        })

        .get(fn.notImplemented)

        .put(fn.notImplemented)

        .delete(fn.notImplemented)

};

export default accountTypesRoutes
