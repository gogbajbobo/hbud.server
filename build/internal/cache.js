"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cache_1 = __importDefault(require("node-cache"));
class SocketUserCache extends node_cache_1.default {
    constructor(options) {
        super(options);
    }
    set(key, value) {
        console.log(`set ${JSON.stringify(arguments)}`);
        return super.set(key, value);
    }
    get(key) {
        return super.get(key);
    }
}
const socketUserCache = new SocketUserCache({ useClones: false });
exports.default = socketUserCache;
