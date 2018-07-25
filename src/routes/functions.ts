import {NextFunction, Request, Response} from "express"
import db from "../internal/db"

import logger from '../internal/logger'
const log = logger(module);

function requireRoles(requiredRoles: string[]) {

    return (req: Request, res: Response, next: NextFunction) => {

        if (!req.user)
            return res.status(401).send('Unauthorized').end();

        const checkRole = (role: string): boolean => requiredRoles.includes(role);

        req.user.roles.split(',').some(checkRole)
            ? next()
            : res.status(403).send('Forbidden').end()

    }

}

function catchErr(err: Error, res: Response) {

    log.debug(err.message);
    res.status(500).json({ error: true, message: err.message })

}

function notImplemented(req: Request, res: Response) {
    res.status(501).json({error: true, message: `Not Implemented`})
}

function updateObject(table: string, id: number, data: any, res: Response) {

    db(table)
        .update(data)
        .where({ id })
        .then(() => res.status(200).json({ error: false }))
        .catch(err => catchErr(err, res))

}

export default {
    requireRoles,
    catchErr,
    notImplemented,
    updateObject
}
