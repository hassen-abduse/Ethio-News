var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http')
const port = 4000;
const url = 'localhost';
var indexRouter = require('./index');
// var usersRouter = require('./routes/users');

var app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')))
app.use('/', indexRouter);
// app.use('/users', usersRouter);
const server = http.createServer(app);
server.listen(port, url, () => {
    console.log(`Server is running at https://${url}:${port}`);
})

module.exports = app;
