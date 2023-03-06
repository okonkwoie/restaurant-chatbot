const express = require('express')
const bodyParser = require('body-parser');
const config = require('./config/config') //configuration folder
const session = require('express-session');
const device = require('express-device');
const mongodbConnect = require('./db/mongodb') //database connection
// const sessionMiddleware = require('./session/session') //session middleware

const app = express()

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// session middleware
// app.use(sessionMiddleware)

// mongodb connection
mongodbConnect

// USER SESSION
// Use express-device to detect the device type
app.use(device.capture());

// Use express-session to store the user session
app.use(                
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// Middleware to store user session based on device type
app.use((req, res, next) => {     
  const deviceId = req.device.type.toUpperCase();
  req.session[deviceId] = req.session[deviceId] || {};
  next();
});




// Route to test session storage
app.get('/', (req, res) => {
    const deviceId = req.device.type.toUpperCase();
    req.session[deviceId] = req.session[deviceId] || {};
    req.session[deviceId].count = req.session[deviceId].count || 0;
    req.session[deviceId].count += 1;
    res.send(
      `Device type: ${req.device.type}, Count: ${req.session[deviceId].count}`
    );
    console.log(req.session);
  });


// // home route
// app.get('/', (req, res) => {
//     res.send('restaurant chatbox running...');
// })




app.listen(config.PORT, () => {
    console.log(`server is listening on port: ${config.PORT}...`);
})