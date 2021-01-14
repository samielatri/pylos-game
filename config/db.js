const mogoose = require('mongoose'); // mongodb interaction
const project_name = 'pylos';
const user_name = 'herpes';
const __PASSWORD__ = require('./pwd.js');
const pwd = encodeURIComponent(__PASSWORD__);
const MongoClient = require('mongodb').MongoClient;

// TODO : put everything in config
// mongodb+srv://herpes:wSdPOFFQR1LnpLMw@pylos.j4ui7.mongodb.net/pylos?retryWrites=true&w=majority
// mongodb+srv://herpes:<password>@pylos.j4ui7.mongodb.net/<dbname>?retryWrites=true&w=majority
const uri = "mongodb+srv://herpes:"+ pwd +"@pylos.j4ui7.mongodb.net/?retryWrites=true&w=majority"; // actual online uri
// "mongodb+srv://herpes:wSdPOFFQR1LnpLMw@pylos.j4ui7.mongodb.net/?retryWrites=true&w=majority"

// connection to database
const connectDB = async ()=>{
    try {
        const conn= await mogoose.connect(
            process.env.MONGO_URI,
            {
                useCreateIndex:true,
                useNewUrlParser:true,
                useUnifiedTopology:true,
                useFindAndModify:false
            }
        )
        console.log(`Mongo Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch(err) {
        console.log(`Err: ${err.message}`.red);
        process.exit(1);
    }
}

module.exports = connectDB;
