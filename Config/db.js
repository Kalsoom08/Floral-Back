require('dotenv').config()
const mongoose = require('mongoose')
const connectionString = process.env.DB_STRING

const connect = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log('DB Connected');
    } catch (err) {
        console.error('DB Connection Failed:', err.message);
        process.exit(1); 
    }
};


module.exports = connect