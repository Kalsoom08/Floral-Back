const upload = require('../../Middleware/cloudinary')
const express = require('express')
const router = express.Router()
const {addOrder} = require('../../Controllers/Public/ordersController')


router.post('/order', upload.single('file'), addOrder)

module.exports = router