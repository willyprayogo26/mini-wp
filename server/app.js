require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = process.env.MONGO_PORT || 3000

const routes = require('./routes')

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@db-mini-willy-w30vg.gcp.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true });

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', routes)

app.listen(port, () => {
    console.log(`Server start on port: ${port}`)
})