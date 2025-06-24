const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true        
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum  : ['user', 'admin'],
        default: 'user'
    }
})

const Auth = mongoose.model('Auth', authSchema)
module.exports = Auth 