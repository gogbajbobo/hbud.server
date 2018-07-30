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

            Subaccounts.addSubccount(req.user.id, name, accountId)
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

        .put((req, res) => {

            const id = req.params.id;

            const { name, account_id } = req.body;

            Subaccounts.updateSubaccount(id, req.user.id, name, account_id)
                .then(() => res.status(200).json({ error: false }))
                .catch(err => fn.catchErr(err, res))


        })

        .delete((req, res) => {

            const id = req.params.id;

            if (!id)
                return res.status(400).json({error: true, code: 400, message: 'Bad Request'});

            Subaccounts.deleteSubaccount(id)
                .then(() => res.status(200).json({ error: false }))
                .catch(err => fn.catchErr(err, res))

        })

};

export default subaccountsRoutes
