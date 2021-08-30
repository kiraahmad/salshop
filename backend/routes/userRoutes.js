const express = require('express')
const authUser = require('../controllers/userController')

const router = express.Router()

//asyncHandler is a replacement for tryCatch
router.post('/login', authUser)


module.exports = router