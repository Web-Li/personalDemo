var express = require('express');
var router = express.Router();
// var bcrypt = require('bcrypt');

var User = require('./../models/user');

/* GET home page. */
router.post('/', function (req, res, next) {
    const { name, pass, captcha: reqCaptcha} = req.body.form;
    if (!name || !pass || !reqCaptcha) {
        res.json({
            code: 202,
            msg: '参数不全',
        });
    }
    const captcha = req.session.captcha;
    if (!captcha || reqCaptcha.toLowerCase() != captcha.toLowerCase()) {
        res.json({
            code: 201,
            msg: '验证码错误',
        });
    }
    User.authenticate(name, pass, (err, user) => {
        if (err) return next(err);
        if (user) {
            req.session.uid = user.id;
            res.json({
                code: 200,
                msg: '登录成功'
            });
        }
    })

});

module.exports = router;
