const express = require('express')
const dotenv = require('dotenv')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

dotenv.config()

connectDB()

const app = express()


//allows us to accept JSON data in body
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running...')
})

//anything that goes to this route '/api/products' will be redirected to the file productRoutes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)
 

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))