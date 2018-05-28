import jwt from 'jsonwebtoken'
import config from './config'
import { UserModel } from "./db";

function invokeToken(user: UserModel, message: string): Object {

    const tokenLifetime = 31 * 24 * 60 * 60; // seconds
    const expirationTime = Math.floor(Date.now() / 1000) + tokenLifetime;

    const userData = {
        username: user.username,
        role: user.role,
        id: user.id,
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

export default { invokeToken };