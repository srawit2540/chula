const express = require('express')
const router = express.Router()
const { getArticles, getArticle, addArticle } = require('./article.controller')

router
    .route('/')
    .get(getArticles)
    .post(addArticle)

router.route('/:id').get(getArticle)

module.exports = router
