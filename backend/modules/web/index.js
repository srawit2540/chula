const express = require('express')
const { galleryRoutes } = require('./gallery/index')
const { workshopRoutes } = require('./workshop/index')
const { articleRoutes } = require('./article/index')

const router = express.Router()

router.use('/gallery', galleryRoutes)
router.use('/workshop', workshopRoutes)
router.use('/article', articleRoutes)

module.exports = router
