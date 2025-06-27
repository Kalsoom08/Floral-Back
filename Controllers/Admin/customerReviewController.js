const Review = require('../../Models/customerReviewModel')
const catchAsync = require('../../Utils/catchAsync')

const deleteReview = catchAsync(async(req, res)=>{
    const {id} = req.params;
    const deleted = await Review.findByIdAndDelete(id);

 if (!deleted) {
        return res.status(404).json({
            message: 'Review not found or already deleted'
        });
    }

    res.status(200).json({
        message: 'Review deleted successfully',
        data: deleted
    });
})

module.exports = {deleteReview}