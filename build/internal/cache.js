"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cache_1 = __importDefault(require("node-cache"));
class SocketUserCache extends node_cache_1.default {
    constructor(options) {
        super(options);
        const old_set = this.set;
        this.set = function (key, value) {
            console.log(`set ${JSON.stringify(arguments)}`);
            return old_set(key, value);
        };
        this.get = (() => {
            // check if need reauth
            return this.get;
        })();
    }
}
const socketUserCache = new SocketUserCache({ useClones: false });
exports.default = socketUserCache;
