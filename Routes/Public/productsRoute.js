const {getAllProducts, getProductByName, getProductByID} = require('../../Controllers/Public/productsController')
const express = require('express')
const router = express.Router()

router.get('/product', getAllProducts)
router.get('/product/title/:title', getProductByName)
router.get('/product/id/:id', getProductByID)
module.exports = router