const {registerUser, loginUser} = require('../../Controllers/Public/authController')
const express = require('express')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router