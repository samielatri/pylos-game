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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// satatic
app.use(express.static(path.join(__dirname, 'public')));


// view engine setup
app.set('views', path.join(__dirname, 'views')); // views
app.set('view engine', 'ejs'); // ejs

// const trnasactions = require('./routes/transactions');
const signup = require('./routes/user/signup');
const login = require('./routes/user/login');
// const games = require('./routes/game/game');


app.use(express.json());

// configure logs
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // for logs
}

// app.use('/api/v1/transactions', trnasactions);
app.use(signup);
app.use(login);
// app.use('',games);


// Configuration for deploymnet of on server and run on one port
// TODO : change it to normal build, this one is for REACT
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const DEFAULTPORT = 3000;
const PORT = process.env.PORT || DEFAULTPORT;
// listen for requests
app.listen(PORT, console.log(`Server running  in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
