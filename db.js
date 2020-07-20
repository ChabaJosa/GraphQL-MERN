const mongoose = require('mongoose')
const colors = require('colors')

const { MONGODB } = require("./config.js");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (err){
        console.log(`Error: ${err.message}`.red)
        process.exit(1) // Makes Application shut down.
    }
}

module.exports = connectDB;