const mongoose = require('mongoose')
const moment = require('moment')

const gallerySchema = mongoose.Schema({
    coverImage: {
        type: String,
        required: [true, 'coverImage is not be empty'],
    },
    coverTitle: {
        type: String,
        required: [true, 'coverTitle is not be empty'],
    },
    title: { type: String, required: [true, 'title is not be empty'] },
    subTitle: { type: String, required: [true, 'subTitle is not be empty'] },
    content: [
        {
            _id: false,
            image: { type: String, required: [true, 'image is not be empty'] },
            description: {
                type: String,
                required: [true, 'description is not be empty'],
            },
        },
    ],
    createdAt: {
        type: String,
        default: moment(Date.now()).format('DD/MM/YYYY hh:mm:ss'),
    },
    updatedAt: {
        type: String,
        default: moment(Date.now()).format('DD/MM/YYYY hh:mm:ss'),
    },
})

const Gallery = mongoose.model('Gallery', gallerySchema)

module.exports = Gallery
