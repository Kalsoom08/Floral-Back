const express = require('express')
const router = express.Router()
const {upsertContent} = require('../../Controllers/Admin/contentController')

router.post('/content',upsertContent )

module.exports = router