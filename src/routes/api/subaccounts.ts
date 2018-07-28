import { Router } from 'express'
import fn from '../functions'
import Subaccounts from '../../internal/db/subaccounts'

const subaccountsRoutes = (router: Router, rootPath: string) => {

    const subaccountsPath = `${ rootPath }/subaccounts`;
    const subaccountsIdPath = `${ rootPath }/subaccounts/:id`;

    router.route([subaccountsPath, subaccountsIdPath])
        .all(fn.requireRoles(['admin', 'user']), (req, res, next) => next());

    router.route(subaccountsPath)

        .get((req, res) => {

            Subaccounts.getSubaccounts(req.user.id)
                .then(subaccounts => res.status(200).json({ error: false, subaccounts }))
                .catch(err => fn.catchErr(err, res))

        })

        .post((req, res) => {

            const {name, accountId} = req.body;

            if (!name || !accountId )
                return res.status(400).json({error: true, code: 400, message: 'Bad Request'});

            Subaccounts.addSubccount(name, accountId, req.user.id)
                .then(subaccounts => res.status(200).json({ error: false, subaccounts }))
                .catch(err => fn.catchErr(err, res))

        });

    router.route(subaccountsIdPath)

        .all((req, res, next) => {

            return (req.params.id)
                ? next()
                : res.status(400).json({error: true, message: `have no id`})

        })

        .get(fn.notImplemented)

        .put(fn.notImplemented)

        .delete(fn.notImplemented)

};

export default subaccountsRoutes
