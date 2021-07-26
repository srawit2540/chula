const catchAsync = require('../../../helpers/catchAsync')
const APIFeatures = require('../../../utils/apiFeatures')
const ErrorHandler = require('../../../helpers/errorHandler')
const Gallery = require('./../../models/gallery.model')
const uploadFile = require('./../../../middleware/upload')

exports.getGalleries = catchAsync(async (req, res, next) => {
    const featuresGallery = new APIFeatures(Gallery.find(), req.query)
        .filter()
        .limitFields()
        .paginate()
        .sort()

    const AllGallery = await featuresGallery.query

    res.status(200).json({
        status: 'success',
        data: {
            Gallery: AllGallery,
        },
    })
})

exports.getGallery = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const gallery = await Gallery.findById(id)

    if (!gallery) return next(new ErrorHandler('Data not found', 404))

    res.status(200).json({
        status: 'success',
        data: {
            gallery,
        },
    })
})

exports.addGallery = catchAsync(async (req, res, next) => {
    let coverImageName, coverImage, image, imageName, gallery
    const content = JSON.parse(req.body.content)

    if (req.files) {
        if (req.files.coverImage) {
            coverImage = req.files.coverImage || ''
            coverImageName = coverImage !== '' ? req.files.coverImage.name : ''
            const newCoverImage = uploadFile(coverImageName, coverImage)
            if (newCoverImage)
                return next(new ErrorHandler(`Fail to upload image.`, 400))
        }

        if (req.files.image) {
            image = req.files.image || ''
            imageName = image !== '' ? req.files.image.name : ''
            const newImage = uploadFile(imageName, image)
            if (newImage)
                return next(new ErrorHandler(`Fail to upload image.`, 400))
        }

        let obj = {
            ...req.body,
            coverImage: coverImageName,
            content: {
                image: imageName,
                description: content.description,
            },
        }

        gallery = await Gallery.create(obj)
    } else {
        gallery = await Gallery.create({ ...req.body, content })
    }

    res.status(201).json({
        status: 'success',
        data: {
            gallery,
        },
    })
})
