const mongoose = require('mongoose');
const Review = require('../../Models/customerReviewModel');
const catchAsync = require('../../Utils/catchAsync');

const createReview = catchAsync(async (req, res) => {
    const { productID, userID, ratings, comments } = req.body;

    const review = await Review.create({
        productID,
        userID,
        ratings,
        comments
    });

    const populatedReview = await Review.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(review.id) }

        },
        {
            $lookup: {
                from: 'products', 
                localField: 'productID',
                foreignField: '_id',
                as: 'productArray'
            }
        },
        {
            $unwind: '$productArray'
        },
    
        {
            $lookup: {
                from: 'auths', 
                localField: 'userID',
                foreignField: '_id',
                as: 'userArray'
            }
        },
        {
            $unwind: '$userArray'
        },

        {
            $project: {
                _id: 1,
                ratings: 1,
                comments: 1,
                product: '$productArray',
                user: '$userArray'
            }
        }
    ]);

    res.status(201).json({
        message: 'Feedback recorded successfully',
        data: populatedReview[0]
    });
});






const getReview = catchAsync(async (req, res) => {
    const { productID } = req.params;

    if (!productID) {
        return res.status(400).json({
            message: 'productID is required in query'
        });
    }

    const reviews = await Review.find({ productID })
        .populate('userID')
        .populate('productID');

    if (reviews.length === 0) {
        return res.status(200).json({
            message: 'No reviews found for this product',
            data: []
        });
    }

    res.status(200).json({
        message: 'Reviews fetched successfully',
        data: reviews
    });
});


module.exports = { createReview, getReview };
