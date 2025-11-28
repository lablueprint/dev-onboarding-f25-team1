require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const postRoutes = require('./routes/posts')
const profileRoutes = require('./routes/profile')

app.use(express.json())

// Enable CORS for Expo Web (8081) and local app
app.use(cors({
    origin: [
        'http://localhost:8081'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
}))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/posts', postRoutes)
app.use('/api/profile', profileRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
