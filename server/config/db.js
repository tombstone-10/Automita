// connecting to database

const mongoose = require('mongoose');   //Object Data Modeling (ODM) interface for MongoDB in Node.js

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MongoURI);   //connection string

        console.log('MongoDB connected to host: ' + (con.connection.host).cyan.underline); // printing the connection
    }
    catch (err) {
        console.log((err).red.underline);
        process.exit(1);
    }
}

module.exports = connectDB;