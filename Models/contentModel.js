const mongoose = require('mongoose')

const ContentSchema = new mongoose.Schema({
     type: {
        type: String, 
        required: true,
        unique: true
    },
    content: mongoose.Schema.Types.Mixed
})

module.exports = mongoose.model('Content', ContentSchema)