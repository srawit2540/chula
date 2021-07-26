const mongoose = require('mongoose')
const moment = require('moment')

const workshopSchema = mongoose.Schema({
    coverImage: { type: String },
    image: { type: String },
    title: { type: String },
    description: { type: String },
    locationName: { type: String },
    contact: {
        telephone: { type: String },
        location: {
            latitude: String,
            longitude: String,
        },
        facebook: String,
        instagram: String,
        mailto: String,
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

const WorkShop = mongoose.model('WorkShop', workshopSchema)

module.exports = WorkShop
