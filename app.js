const express = require('express')
const bodyParser = require('body-parser');
const config = require('./config/config')
const mongodbConnect = require('./db/mongodb')

const app = express()

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// mongodb connection
mongodbConnect




// home route
app.get('/', (req, res) => {
    res.send('restaurant chatbox running...');
})




app.listen(config.PORT, () => {
    console.log(`server is listening on port: ${config.PORT}...`);
})