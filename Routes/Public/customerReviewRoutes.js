const {createReview, getReview} = require('../../Controllers/Public/customerReviewController')
const express = require('express')
const router = express.Router()


router.post('/review', createReview)
router.get('/review/:productID', getReview)

module.exports = router