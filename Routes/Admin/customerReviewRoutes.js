const {deleteReview} = require('../../Controllers/Admin/customerReviewController')
const express = require('express')
const router = express.Router()

router.delete('/review/:id', deleteReview);

module.exports = router