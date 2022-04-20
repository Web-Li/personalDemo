const User = require('../models/user');
const auth = require('basic-auth');

exports.user = (req, res, next) => {
    User.get(req.params.id, (err, user) => {
        if (err) return next(err);
        if (!user.id) {
            res.json({
                code: 203,
                msg: '不存在的用户',
            });
        }
        res.json({
            code: 200,
            user,
        });
    });
};

// exports.auth = (req, res, next) => {
//     console.log(req.headers.authorization, '----2')
//     const {name, pass} = auth(req) || {};
//     if (!name || !pass) {
//         next(new Error('not Login'));
//     }
//     console.log(name, pass, 'pass+name')
//     User.authenticate(name, pass, (err, user) => {
//         if (user) req.remoteUser = user;
//         next(err);
//     })
// };
