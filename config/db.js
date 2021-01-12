const mogoose = require('mongoose'); // mongodb interaction

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
