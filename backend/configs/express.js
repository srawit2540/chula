const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

module.exports = async (app) => {
    require('./database')
    app.use(helmet())

    const limiter = rateLimit({
        max: 100,
        windowMs: 60 * 1000,
        message:
            'Too many requests from this IP, please try again in an minutes!',
    })

    app.use('/api', limiter)
    app.use(cors())

    app.use(
        fileUpload({
            limits: { fileSize: 50 * 1024 * 5024000 },
        })
    )

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
        next()
    })

    app.use(express.json({ limit: '10kb' }))
    app.use(express.urlencoded({ extended: false, limit: '500mb' }))

    app.use(mongoSanitize())
    app.use(xss())
    app.use(hpp())
}
