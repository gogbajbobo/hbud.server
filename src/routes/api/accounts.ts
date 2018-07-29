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

        .post((req, res) => {

            const {name, type_id} = req.body;

            if (!name || !type_id )
                return res.status(400).json({error: true, code: 400, message: 'Bad Request'});

            Accounts.addAccount(name, type_id, req.user.id)
                .then(account => res.status(200).json({ error: false, account }))
                .catch(err => fn.catchErr(err, res))

        });

    router.route(accountsIdPath)

        .all((req, res, next) => {

            return (req.params.id)
                ? next()
                : res.status(400).json({error: true, message: `have no id`})

        })

        .get(fn.notImplemented)

        .put(fn.notImplemented)

        .delete((req, res) => {

            const id = req.params.id;

            if (!id)
                return res.status(400).json({error: true, code: 400, message: 'Bad Request'});

            Accounts.deleteAccount(id)
                .then(() => res.status(200).json({ error: false }))
                .catch(err => fn.catchErr(err, res))

        })

};

export default accountsRoutes
