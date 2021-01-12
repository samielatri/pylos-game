const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('scoket.io'); // socket io

var bodyParser = require('body-parser');
var cors = require('cors');


const dotenv = require('dotenv'); // env file
const morgan = require('morgan'); // for logs
const colors = require('colors'); // colors


const connectDB = require('./config/db');
var cookieParser = require('cookie-parser');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

// list of sockets, a socket by user
var socket_list = {};

const io = socketio(server); 
// Run when a client connect (socket)
io.on('connection', socket => {
    console.log('new websocket connection');

    // TODO : check that id is unique with do while exitsts
    socket.id = Math.random();
    socket.board = null;    
    socket_list[socket.id] = socket;

    socket.emit('message', 'Welcome to Pylos game'); // single client

    // Boradcast when a user connects to a game 
    socket.broadcast.emit('message', 'A user has joined the game'); // all clients except the current client 

    // Runs when a user disconnects from the game
    socket.on('disconnect', () =>{
        io.emit('message', 'A user has left the game'); // all
    })

    // test socket
    //socket.on('happy', function(data) {
    //    console.log('happy because ' + data);
    //})
    
})

// shows the board
setInterval(function(){
    // package
    let pack = [];
    for (let i in socket_list) {
        let socket = socket_list[i];
        pack.push({
            board:socket.board
        })
        socket.emit('newBoard', {
            board:socket.board
        });    
    }
},1000/25) // runs every 40ms

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// const trnasactions = require('./routes/transactions');
const signup = require('./routes/user/signup');
const login = require('./routes/user/login');
// const games = require('./routes/game/game');


app.use(express.json());
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running  in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
