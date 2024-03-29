var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/users.js');
var captchaRouter = require('./routes/captcha.js');
var dbdemoRouter = require('./routes/dbdemo.js');
var registerRouter = require('./routes/register.js');
var loginRouter = require('./routes/login.js');
var user = require('./middleware/user');
var api = require('./routes/api');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secretKeyDemo' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(user);
app.all('*', (req, res, next) => {
    // google需要配置，否则报错cors error
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // 允许的地址,http://127.0.0.1:9000这样的格式
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 允许跨域请求的方法
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    // 允许跨域请求header携带哪些东西
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since');
    next();
});
app.use('/', indexRouter);
// app.use('/api', api.auth);
app.use('/api/user/:id', api.user);
app.use('/users', usersRouter);
app.use('/captcha', captchaRouter);
app.use('/dbdemo', dbdemoRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
