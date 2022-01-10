var mysql = require('mysql');
var dbConfig = require('../config/mysql');
var dbPool = mysql.createPool(dbConfig);
function query(sql, callback) {
    dbPool.getConnection(function (err, connection) {
        if (err) {
            callback(err);
            return;
        }
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();
        });
    });
}

function queryArgs(sql, args, callback) {
    if (err) {
        callback(err);
        return;
    }
    dbPool.getConnection(function (err, connection) {
        connection.query(sql, args,function (err, rows) {
            callback(err, rows);
            connection.release();
        });
    });
}
module.exports = {
    dbPool,
    query,
    queryArgs
};
