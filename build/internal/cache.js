"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cache_1 = __importDefault(require("node-cache"));
const difference_in_seconds_1 = __importDefault(require("date-fns/difference_in_seconds"));
class SocketUserCache extends node_cache_1.default {
    constructor(options) {
        super(options);
    }
    set(key, value) {
        const tokenExpDate = new Date(value.tokenPayload.exp * 1000);
        const ttl = difference_in_seconds_1.default(tokenExpDate, Date.now());
        return super.set(key, value, ttl);
    }
    get(key) {
        return super.get(key);
    }
}
const socketUserCache = new SocketUserCache({ useClones: false });
exports.default = socketUserCache;
