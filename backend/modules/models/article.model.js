const mongoose = require('mongoose')
const moment = require('moment')

const articleSchema = mongoose.Schema({
    coverImage: {
        type: String,
        required: [true, 'coverImage is not be empty'],
    },
    logo: { type: String, required: [true, 'logo is not be empty'] },
    description: {
        type: String,
        required: [true, 'description is not be empty'],
    },
    link: { type: String, required: [true, 'link is not be empty'] },
    location: {
        latitude: {
            type: String,
            required: [true, 'latitude is not be empty'],
        },
        longitude: {
            type: String,
            required: [true, 'longitude is not be empty'],
        },
    },
    createdAt: {
        type: String,
        default: moment(Date.now()).format('DD/MM/YYYY hh:mm:ss'),
    },
    updatedAt: {
        type: String,
        default: moment(Date.now()).format('DD/MM/YYYY hh:mm:ss'),
    },
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
