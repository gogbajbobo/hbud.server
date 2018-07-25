import NodeCache from 'node-cache'
import { UserModel } from "./db"
import logger from '../internal/logger'
import differenceInSeconds from 'date-fns/difference_in_seconds'

const log = logger(module);

export interface SocketUser {
    user: UserModel,
    tokenPayload: any
}

class SocketUserCache extends NodeCache {

    constructor(options?: NodeCache.Options) {
        super(options)
    }

    get <SocketUser>(key: string|number): SocketUser {
        return super.get(key)
    }

}

const socketUserCache = new SocketUserCache({ useClones: false });

socketUserCache.on( "set", (key, value) => {

    const tokenExpDate = new Date(value.tokenPayload.exp * 1000);
    const ttl = differenceInSeconds(tokenExpDate, Date.now());

    socketUserCache.ttl(key, ttl);

});

socketUserCache.on( "expired", (key, value) => {
    log.debug(`${ key } expired`)
});

export default socketUserCache

