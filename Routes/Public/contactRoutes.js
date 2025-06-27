const {addMessage} = require('../../Controllers/Public/contactController')
const express = require('express')
const router = express.Router()

router.post('/contact', addMessage)

module.exports = router