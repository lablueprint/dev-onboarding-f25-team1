require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()
const postRoutes = require('./routes/posts')
const commentRoutes = require('./routes/comments')

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

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
