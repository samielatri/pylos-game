const path = require('path');
const http = require('http');
const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
var bodyParser = require('body-parser');
var cors = require('cors');
const dotenv = require('dotenv'); // env file
const morgan = require('morgan'); // for logs
const colors = require('colors'); // colors
const connectDB = require('./config/db');
var cookieParser = require('cookie-parser');
dotenv.config({ path: './config/config.env' });

// connect to database
connectDB();

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


app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // TODO : set it back to false ?
app.use(cookieParser());
app.use(session({ secret: 'secret pylos',resave:true,saveUninitialized: true }));

// satatic
app.use(express.static(path.join(__dirname, 'public')));


// view engine setup

// ejs
app.set('view engine', 'ejs'); //set views ejs
app.set('views', path.join(__dirname, 'views')); // set views directory

// hbs
//app.engine('hbs', hbs({
//  extname: 'hbs',
//  defaultLayout: 'default',
//  layoutsDir: __dirname + '/views/',
//}));
//app.set('view engine', 'hbs');



// passport
app.use(passport.initialize());
app.use(passport.session());

const signup = require('./routes/user/signup');
const login = require('./routes/user/login');

// to uncomment
//app.use('/', require('./server/users'));
//app.use('/', require('./server/p'));
//app.use('/', require('./server/passport'));


// TODO : call it
//const games = require('./routes/game/game');


app.use(express.json());

// configure logs
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // for logs
}

// app.use('/transactions', trnasactions);
app.use(signup);
app.use(login);
// app.use('',games);


// if react build (Configuration for deploymnet of on server and run on one port)
//if (process.env.NODE_ENV === 'production') {
//    app.use(express.static('client/build'));
//    app.get('*', (req, res) => {
//        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//    });
//}

const DEFAULTPORT = 5000; 
const PORT = process.env.PORT || DEFAULTPORT;
// listen for requests
app.listen(PORT, console.log(`Server running  in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
