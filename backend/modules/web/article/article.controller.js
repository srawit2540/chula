const catchAsync = require('../../../helpers/catchAsync')
const APIFeatures = require('../../../utils/apiFeatures')
const ErrorHandler = require('../../../helpers/errorHandler')
const Article = require('./../../models/article.model')
const uploadFile = require('./../../../middleware/upload')

exports.getArticles = catchAsync(async (req, res, next) => {
    const featuresArticle = new APIFeatures(Article.find(), req.query)
        .filter()
        .limitFields()
        .paginate()
        .sort()

    const AllArticle = await featuresArticle.query
    res.status(200).json({
        status: 'success',
        data: {
            Article: AllArticle,
        },
    })
})

exports.getArticle = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const article = await Article.findById(id)

    if (!article) return next(new ErrorHandler('Data not found', 404))

    res.status(200).json({
        status: 'success',
        data: {
            article,
        },
    })
})

exports.addArticle = catchAsync(async (req, res, next) => {
    let coverImageName, coverImage, logo, logoName, article
    const location = JSON.parse(req.body.location)

    if (req.files) {
        if (req.files.coverImage) {
            coverImage = req.files.coverImage || ''
            coverImageName = coverImage !== '' ? req.files.coverImage.name : ''
            const newCoverImage = uploadFile(coverImageName, coverImage)
            if (newCoverImage)
                return next(new ErrorHandler(`Fail to upload image.`, 400))
        }

        if (req.files.logo) {
            logo = req.files.logo || ''
            logoName = logo !== '' ? req.files.logo.name : ''
            const newLogo = uploadFile(logoName, logo)
            if (newLogo)
                return next(new ErrorHandler(`Fail to upload image.`, 400))
        }

        let obj = {
            ...req.body,
            coverImage: coverImageName,
            logo: logoName,
            location,
        }

        article = await Article.create(obj)
    } else {
        article = await Article.create({ ...req.body, location })
    }

    res.status(201).json({
        status: 'success',
        data: {
            article,
        },
    })
})
