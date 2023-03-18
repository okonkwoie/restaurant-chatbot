const express = require('express')
const bodyParser = require('body-parser');
const config = require('./config/config') //configuration folder
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const session = require('express-session');
const mongodbConnect = require('./db/mongodb'); //database connection
const chatbotRouter = require('./routes/chatbot');
const itemRouter = require('./routes/items');

const app = express()

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'));

// set up session middleware
app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
// Apply the rate limiting middleware to all requests
app.use(limiter)

// security middleware
app.use(helmet())

// ejs template
app.set("view engine", "ejs");
app.set('views', 'views')

// routes
app.use('/chatbot', chatbotRouter)
app.use('/items', itemRouter)


// mongodb connection
mongodbConnect


app.listen(config.PORT, () => {
    console.log(`server is listening on port: ${config.PORT}...`);
})