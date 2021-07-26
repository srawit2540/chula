const mongoose = require('mongoose')
const configs = require('./app')

const DB = configs.mongodbUri
const database = {
    mongoDB() {
        mongoose
            .connect(DB, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            })
            .then(() => console.log('DB connection successful!'))
    },
}

module.exports = database.mongoDB()
