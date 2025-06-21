const upload = require('../../Middleware/cloudinary')
const express = require('express')
const router = express.Router()
const {addProduct, updateProduct, deleteProduct} = require('../../Controllers/Admin/productsController')

router.post('/product', upload.single('file'), addProduct)
router.put('/product/:id', upload.single('file'), updateProduct)
router.delete('/product/:id',deleteProduct)


module.exports = router