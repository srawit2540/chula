const express = require('express')
const router = express.Router()
const {
    getWorkshops,
    getWorkshop,
    addWorkshop,
} = require('./workshop.controller')

router
    .route('/')
    .get(getWorkshops)
    .post(addWorkshop)

router.route('/:id').get(getWorkshop)

module.exports = router
