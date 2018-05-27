"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerRoute = (router) => {
    router.route('/register')
        .get((req, res) => res.json({ info: 'hbud.api register get' }))
        .post((req, res) => res.json({ info: 'hbud.api register post' }));
};
exports.default = registerRoute;
// .post(passport.authenticate('jwt'), requireRole('admin'), (req, res) => {
//
//     const { username, password } = req.body;
//     const role = req.body.role || 'user';
//
//     bcrypt.hash(password, 10, (err, hash) => {
//
//         users
//             .insert({
//                 username,
//                 hash,
//                 role
//             })
//             .then(result => res.status(200).json(result))
//             .catch(err => catchErr(err, res))
//
//     })
