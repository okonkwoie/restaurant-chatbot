require('dotenv').config()

module.exports = {
    PORT: process.env.PORT, 
    MONGODB_URL: process.env.MONGODB_URL,
    SESSION_SECRET: process.env.SESSION_SECRET
}