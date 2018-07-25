import jwt from 'jsonwebtoken'
import config from './config'
import { UserModel } from "./db";

function invokeToken(user: UserModel, message: string): any {

    const tokenLifetime = 60 * 60 * 24 * 2; // seconds
    const expirationTime = Math.floor(Date.now() / 1000) + tokenLifetime;

    const userData = {
        id: user.id,
        username: user.username,
        roles: user.roles,
        exp: expirationTime
    };

    const accessToken = jwt.sign(userData, config.get('jwt:secretKey'));

    return {
        error: false,
        message: message || 'Token invoked successfully',
        user: userData,
        accessToken,
        expirationTime
    };

}

function extractData(token: string): any {
    return jwt.decode(token, config.get('jwt:secretKey'))
}

function checkJwtPayload(jwtPayload: any, callback: (err: Error|null) => void): void {

    if (!jwtPayload) return callback(new Error("Unauthorized"));

    const expirationDate = new Date(jwtPayload.exp * 1000);
    if (expirationDate < new Date()) return callback(new Error("Token expire"));

    callback(null)

}

export default {
    invokeToken,
    extractData,
    checkJwtPayload
}
