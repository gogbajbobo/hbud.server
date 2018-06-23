import NodeCache from 'node-cache'
import { UserModel } from "./db"
import differenceInSeconds from 'date-fns/difference_in_seconds'

export interface SocketUser {
    user: UserModel,
    tokenPayload: any
}

class SocketUserCache extends NodeCache {

    constructor(options?: NodeCache.Options) {
        super(options)
    }

    set(key: string|number, value: SocketUser): boolean {

        const tokenExpDate = new Date(value.tokenPayload.exp * 1000);
        const ttl = differenceInSeconds(tokenExpDate, Date.now());
        return super.set(key, value, ttl)

    }

    get <SocketUser>(key: string|number): SocketUser {
        return super.get(key)
    }

}

const socketUserCache = new SocketUserCache({ useClones: false });

export default socketUserCache;

