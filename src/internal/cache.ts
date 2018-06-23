import NodeCache from 'node-cache'
import {UserModel} from "./db"

export interface SocketUser {
    user: UserModel,
    tokenPayload: any
}

class SocketUserCache extends NodeCache {

    constructor(options?: NodeCache.Options) {
        super(options)
    }

    set(key: string|number, value: SocketUser): boolean {

        console.log(`set ${ JSON.stringify(arguments) }`);
        return super.set(key, value)

    }

    get <SocketUser>(key: string|number): SocketUser {
        return super.get(key)
    }

}

const socketUserCache = new SocketUserCache({ useClones: false });

export default socketUserCache;

