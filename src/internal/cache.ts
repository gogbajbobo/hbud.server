import NodeCache from 'node-cache'

class SocketUserCache extends NodeCache {

    constructor(options?: NodeCache.Options) {

        super(options);

        const old_set = this.set;

        this.set = function <T>(key: string|number, value: T): boolean {

            console.log(`set ${ JSON.stringify(arguments) }`);
            return old_set(key, value)

        };

        this.get = (() => {

            // check if need reauth
            return this.get

        })();

    }

}

const socketUserCache = new SocketUserCache({ useClones: false });

export default socketUserCache;

