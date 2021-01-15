console.log("call :server.js");

const path = require('path');
const http = require('http');
const express = require('express');

var bodyParser = require('body-parser');
var cors = require('cors');

const dotenv = require('dotenv'); // env file
const morgan = require('morgan'); // for logs
const colors = require('colors'); // colors

const connectDB = require('./config/db');
var cookieParser = require('cookie-parser');

dotenv.config({ path: './config/config.env' });

console.log("going to connect to database...");

// connect to database
//connectDB();

const app = express();

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // cookie parser

// satatic
app.use(express.static(path.join(__dirname, 'public')));

// ejs configure template engine
app.set('views', path.join(__dirname, '/views')); // set views directory
app.set('view engine', 'ejs'); //set views ejs

const signup = require('./routes/user/signup');
const login = require('./routes/user/login');
app.use(express.json());

// configure logs
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // for logs
}

// routes 
app.use(signup);
app.use(login);


const DEFAULTPORT = 3200; 
const PORT = process.env.PORT || DEFAULTPORT;


// listen for requests
const server =app.listen(PORT, console.log(`Server running  in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
require("./realtime/socket.js")(server);

// if error log in
process.on('uncaughtException', function (err) {
    console.log("server uncaught exception error : err = " + err);
});

// end of server.js
