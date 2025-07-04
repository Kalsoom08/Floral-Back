const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
        fileUrl: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        require: true
    },
},
{
    timestamps: true
})

const Product = mongoose.model('Product', productsSchema);
module.exports = Product