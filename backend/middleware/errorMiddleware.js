//middleware to send a json message in case of invalid path
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

//middleware to send a json message in case of error instead of html page
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {notFound, errorHandler}