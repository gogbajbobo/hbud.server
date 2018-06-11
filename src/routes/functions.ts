import {NextFunction, Request, Response} from "express"
import db from "../internal/db"

function requireRoles(requiredRoles: string[]) {

    return (req: Request, res: Response, next: NextFunction) => {

        if (!req.user)
            return res.status(401).send('Unauthorized').end();

        req.user.roles.split(',').some((role: string) => requiredRoles.includes(role))
            ? next()
            : res.status(403).send('Forbidden').end()

    }

}

function catchErr(err: Error, res: Response) {
    res.status(500).json({ error: true, message: err.message })
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
    updateObject
}
