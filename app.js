const express = require('express')
const bodyParser = require('body-parser');
const config = require('./config/config') //configuration folder
const session = require('express-session');
const mongodbConnect = require('./db/mongodb'); //database connection
const chatbotRouter = require('./routes/chatbot');
const itemRouter = require('./routes/items')

const app = express()

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ejs template
app.set("view engine", "ejs");
app.set('views', 'views')

// routes
app.use('/chatbot', chatbotRouter)
app.use('/item', itemRouter)


// mongodb connection
mongodbConnect

// set up session middleware
app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));



app.listen(config.PORT, () => {
    console.log(`server is listening on port: ${config.PORT}...`);
})