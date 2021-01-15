const path = require('path');
const http = require('http');
const express = require('express');

// const hbs = require('express-handlebars');
// const session = require('express-session');
// const passport = require('passport');

var bodyParser = require('body-parser');
var cors = require('cors');

const dotenv = require('dotenv'); // env file
const morgan = require('morgan'); // for logs
const colors = require('colors'); // colors

const connectDB = require('./config/db');
var cookieParser = require('cookie-parser');

dotenv.config({ path: './config/config.env' });

// connect to database
//connectDB();

const app = express();

// list of sockets, a socket by user
//setInterval(function(){
    // package
//    let pack = [];
//    for (let i in socket_list) {
//        let socket = socket_list[i];
//        pack.push({
//            board:socket.board
//        })
//        socket.emit('newBoard', {
//            board:socket.board
//        });    
//    }
//},1000/25) // runs every 40ms

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// satatic
app.use(express.static(path.join(__dirname, 'public')));

// ejs
app.set('views', path.join(__dirname, '/views')); // set views directory
app.set('view engine', 'ejs'); //set views ejs

const signup = require('./routes/user/signup');
const login = require('./routes/user/login');
app.use(express.json());

// configure logs
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // for logs
}
app.use(signup);
app.use(login);
const DEFAULTPORT = 3200; 
const PORT = process.env.PORT || DEFAULTPORT;
// listen for requests
const server =app.listen(PORT, console.log(`Server running  in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
require("./realtime/socket.js")(server);
// if error log in
process.on('uncaughtException', function (err) {
    console.log(err);
}); 
