const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
var config = require('config');
var morgan = require('morgan');
var svgCaptcha = require('svg-captcha');
var cors = require('cors');
const express = require('express'); 
const app = express(); 
app.use(cors());

const home = require('./routes/home');
const data = require('./routes/data');
const common = require('./routes/common');
const crud = require('./routes/crud');
const login = require('./routes/login');

if (!config.get('jwtPrivateKey')) 
{
    console.error('FATAL error jwtPrivate not defined');
    process.exit(1);
}

const logger = require('./middleware/logger');
app.use(express.json({ limit: '10MB' }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
startupDebugger('Morgan Enabled');
dbDebugger('Connected to database');
app.use(express.static('public'));  

app.use(logger);

app.use(function (req, res, next) 
{    
    next();
});

app.use('/', home);
app.use('/visionapi/common', common);
app.use('/visionapi/data', data);
app.use('/visionapi/crud', crud);
app.use('/visionapi/login', login);

// CAPTCHA  //

app.get('/visionapi/captcha', function (req, res) {
    var captcha = svgCaptcha.create({ ignoreChars: 'lI0Oo' });
    res.json(captcha);
});


const port = process.env.PORT || 7000;
app.listen(port, () => 
{
    
});