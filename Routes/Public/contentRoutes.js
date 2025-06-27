const express = require('express')
const router = express.Router()
const {getContent} = require('../../Controllers/Public/contentController')

router.get('/content/:type', getContent )

module.exports = router