const mongoose = require('mongoose')
const config = require('../config/config')

function mongodbConnect(){
    mongoose.connect(config.MONGODB_URL)

    // successful connection
    mongoose.connection.on('connected', () => {
        console.log('mongodb connected successfully...');
    })

    //  unsuccessful connection
    mongoose.connection.on('error', (err) => {
        console.log('mongodb connection unsuccessful..');
        console.log(err);
    })
}



module.exports = mongodbConnect()
