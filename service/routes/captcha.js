var express = require('express');
var svgCaptcha = require('svg-captcha');
var router = express.Router();

router.get('/', function (req, res, next) {
    const captcha = svgCaptcha.create({
        size: 4,
        fontSize: 45,
        noise: 1,
        width: 120,
        height: 36,
        color: true,
        background: '#ccc',
    });
    console.log(req.session);
    req.session.captcha = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
});
router.post('/', function (req, res, next) {
    const captcha = req.session.captcha;
    if (captcha && req.body.captcha && captcha.toLowerCase() == req.body.captcha.toLowerCase()) {
        res.json({
            code: 200,
            msg: 'success',
        });
    } else {
        res.json({
            code: 201,
            msg: 'error',
        });
    }
});

module.exports = router;
