var express = require('express');
var router = express.Router();
var dbPool = require('../db/dbpool');

/* GET home page. */
router.get('/', function (req, res, next) {
    dbPool.query('select * from groot2_template', function (err, result) {
        if (err) {
            res.send(err);
            return;
        }
        res.send(result);
    });
});

module.exports = router;
