const express = require('express')
const router = express.Router()
const {deleteOrder, updateOrder} = require('../../Controllers/Admin/orderController')
const Verify = require('../../Middleware/verifyAdminMiddleware')
const RestrictTo = require('../../Middleware/restrictToMiddleware')

router.put('/order/:id', Verify,RestrictTo('admin') , updateOrder)
router.delete('/order/:id', Verify,RestrictTo('admin') , deleteOrder)

module.exports = router;