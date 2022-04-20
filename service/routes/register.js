var express = require('express');
var User = require('./../models/user');

var router = express.Router();
router.post('/', function (req, res, next) {
    console.log(req);
    const { name, pass, captcha: reqCaptcha } = req.body.form;
    const captcha = req.session.captcha;
    if (!captcha || !reqCaptcha || captcha.toLowerCase() != reqCaptcha.toLowerCase()) {
        res.json({
            code: 201,
            msg: '验证码错误',
        });
    }
    User.getByName(name, (err, user) => {
        if (err) {
            return next(err);
        }
        if (user && user.id) {
            console.log(user);
            res.json({
                code: 1001,
                msg: '用户名已存在',
            });
            return;
        }
        user = new User({
            name,
            pass,
        });
        user.save(err => {
            if (err) return next(err);
            req.session.uid = user.id;
            res.json({
                code: 200,
                msg: '保存成功',
            });
        });
    });
});

module.exports = router;
