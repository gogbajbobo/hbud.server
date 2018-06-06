import {NextFunction, Request, Response} from "express";
import db from "../internal/db";

function requireRole(role: string | string[]) {

    return (req: Request, res: Response, next: NextFunction) => {

        req.user
            ? role.includes(req.user.role)
            ? next()
            : res.status(401).send('Unauthorized').end()
            : res.status(403).send('Forbidden').end()

    }

}

function catchErr(err: Error, res: Response) {
    res.status(500).json({ error: true, message: err.toLocaleString() })
}

function updateObject(table: string, id: number, data: any, res: Response) {

    db(table)
        .update(data)
        .where({ id })
        .then(() => res.status(200).json({ error: false }))
        .catch(err => catchErr(err, res))

}

export default {
    requireRole,
    catchErr,
    updateObject
}
