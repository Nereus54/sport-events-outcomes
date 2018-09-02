'use strict';
//APP DEPENDENCIES
const
    express             = require('express'),
    morgan              = require('morgan'),
    logger              = require('./lib/logger'),
    cookieParser        = require('cookie-parser'),
    bodyParser          = require('body-parser'),
    expressValidator    = require('express-validator'),
    consign             = require('consign'),
    helmet              = require('helmet'),
    hpp                 = require('hpp'),
    app                 = express();

    global.logger       = require('./lib/logger');

// logger --start
app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, stream: process.stderr
}));

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode >= 400
    }, stream: process.stdout
}));
// logger --end

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator({}));
app.use(hpp()); // protection against HTTP Parameter Pollution attacks
app.use(cookieParser());

app.set('view engine', 'pug');
app.use(express.static('public'));

consign()
    .include("route")
    .then("lib/error/errorHandling.js")
    .into(app);

module.exports          = app;
module.exports.baseDir  = __dirname;
module.exports.logger   = logger;