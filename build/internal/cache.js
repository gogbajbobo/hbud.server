"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cache_1 = __importDefault(require("node-cache"));
const logger_1 = __importDefault(require("../internal/logger"));
const difference_in_seconds_1 = __importDefault(require("date-fns/difference_in_seconds"));
const log = logger_1.default(module);
class SocketUserCache extends node_cache_1.default {
    constructor(options) {
        super(options);
    }
    get(key) {
        return super.get(key);
    }
}
const socketUserCache = new SocketUserCache({ useClones: false });
socketUserCache.on("set", (key, value) => {
    const tokenExpDate = new Date(value.tokenPayload.exp * 1000);
    const ttl = difference_in_seconds_1.default(tokenExpDate, Date.now());
    socketUserCache.ttl(key, ttl);
});
socketUserCache.on("expired", (key, value) => {
    log.debug(`${key} expired`);
});
exports.default = socketUserCache;
