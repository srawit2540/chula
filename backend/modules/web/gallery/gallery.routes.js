const express = require('express')
const router = express.Router()
const { getGalleries, getGallery, addGallery } = require('./gallery.controller')

router
    .route('/')
    .get(getGalleries)
    .post(addGallery)

router.route('/:id').get(getGallery)

module.exports = router
