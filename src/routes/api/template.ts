import { Router } from 'express'
import fn from '../functions'

const templateRoutes = (router: Router, rootPath: string) => {

    const templatePath = `${ rootPath }/template`;
    const templateIdPath = `${ rootPath }/template/:id`;

    router.route([templatePath, templateIdPath])
        .all(fn.requireRoles(['admin']), (req, res, next) => next());

    router.route(templatePath)

        .get((req, res) => {
            res.status(501).json({error: true, message: `Not Implemented`})
        })

        .post((req, res) => {
            res.status(501).json({error: true, message: `Not Implemented`})
        });

    router.route(templateIdPath)

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

export default templateRoutes
