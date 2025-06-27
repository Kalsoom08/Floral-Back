const mongoose = require('mongoose')

const customerReviewSchema  = new mongoose.Schema({
    productID :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }, 
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    ratings: {
        type: Number,
        min: 1,
        max: 5
    },
    comments: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

const Review = mongoose.model('Review', customerReviewSchema)
module.exports = Review