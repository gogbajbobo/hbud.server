"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("./db"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const LocalStrategy = passport_local_1.default.Strategy, JwtStrategy = passport_jwt_1.default.Strategy, ExtractJwt = passport_jwt_1.default.ExtractJwt;
const logger_1 = __importDefault(require("./logger"));
const log = logger_1.default(module);
passport_1.default.use(new LocalStrategy((username, password, done) => {
    findUserByUsername(username, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        verifyPassword(user, password, result => {
            if (result) {
                clearUserReauth(user.id);
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    });
}));
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.default.get('jwt:secretKey')
};
passport_1.default.use(new JwtStrategy(opts, (jwtPayload, done) => {
    const expirationDate = new Date(jwtPayload.exp * 1000);
    if (expirationDate < new Date()) {
        return done(null, false);
    }
    findUserByUsername(jwtPayload.username, (err, user) => {
        return done(null, user ? (user.reauth ? false : user) : false);
    });
}));
passport_1.default.serializeUser(serializeUser);
passport_1.default.deserializeUser(deserializeUser);
function findUserByUsername(username, callback) {
    db_1.default('users')
        .where({ username })
        .then(users => Promise.resolve(callback(null, users[0])))
        .catch(err => Promise.resolve(callback(err, false)));
}
function findUserById(id, callback) {
    db_1.default('users')
        .where({ id })
        .then(users => Promise.resolve(callback(null, users[0])))
        .catch(err => Promise.resolve(callback(err, false)));
}
function verifyPassword(user, password, callback) {
    bcryptjs_1.default.compare(password, user.hash, (err, result) => {
        callback(result);
    });
}
function clearUserReauth(id) {
    db_1.default('users')
        .update({ reauth: false })
        .where({ id })
        .then(() => log.info(`clearUserReauth ${id} success`))
        .catch(err => log.info(`clearUserReauth ${id} error ${err}`));
}
function serializeUser(user, done) {
    done(null, user.id);
}
function deserializeUser(id, done) {
    findUserById(id, (err, user) => { done(err, user); });
}
exports.default = passport_1.default;
