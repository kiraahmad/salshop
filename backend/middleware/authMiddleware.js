const jwt = require('jsonwebtoken')
const asyncHanlder = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHanlder (async (req, res, next) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error ('Not Authorized, token failed!')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error ('Not Authorized, No token')
    }
})

module.exports = { protect }