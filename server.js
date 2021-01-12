const path = require('path');
const express = require('express');
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
