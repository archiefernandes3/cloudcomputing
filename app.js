const express = require('express')
const app = express()

const mongoose = require('mongoose')
require('dotenv/config')

const bodyParser = require('body-parser')
const postsRoute = require('./routes/posts')

app.use(bodyParser.json())// to receive message from postman
app.use('/posts', postsRoute)

app.get('/', (req, res) => {
    res.send('Homepage')
})

//.env file created to hide username & password from public domain
// install packakge to use .env file, npm install dotenv

mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
    console.log('Your mongoDB connector is on...')
})

app.listen(3000, () => {
    console.log('Server is up and running...')
})