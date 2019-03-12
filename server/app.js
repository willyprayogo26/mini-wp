const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()
const port = 3000

const routes_articles = require('./routes/articles')

mongoose.connect('mongodb://localhost:27017/articles', { useNewUrlParser: true });


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/article', routes_articles)

app.listen(port, () => {
    console.log(`Server start on port: ${port}`)
})