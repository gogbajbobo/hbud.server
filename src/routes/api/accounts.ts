import { Router } from 'express'
import fn from '../functions'
import Accounts from '../../internal/db/accounts'

const accountsRoutes = (router: Router, rootPath: string) => {

    const accountsPath = `${ rootPath }/accounts`;
    const accountsIdPath = `${ rootPath }/accounts/:id`;

    router.route([accountsPath, accountsIdPath])
        .all(fn.requireRoles(['admin', 'user']), (req, res, next) => next());

    router.route(accountsPath)

        .get((req, res) => {

            Accounts.getAccounts(req.user.id)
                .then(accounts => res.status(200).json({ error: false, accounts }))
                .catch(err => fn.catchErr(err, res))

        })

        .post(fn.notImplemented);

    router.route(accountsIdPath)

        .all((req, res, next) => {

            return (req.params.id)
                ? next()
                : res.status(400).json({error: true, message: `have no id`})

        })

        .get(fn.notImplemented)

        .put(fn.notImplemented)

        .delete(fn.notImplemented)

};

export default accountsRoutes
