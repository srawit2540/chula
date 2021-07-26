const catchAsync = require('../../../helpers/catchAsync')
const APIFeatures = require('../../../utils/apiFeatures')
const ErrorHandler = require('../../../helpers/errorHandler')
const Workshop = require('./../../models/workshop.model')
const uploadFile = require('./../../../middleware/upload')

exports.getWorkshops = catchAsync(async (req, res, next) => {
    const featuresWorkshop = new APIFeatures(Workshop.find(), req.query)
        .filter()
        .limitFields()
        .paginate()
        .sort()

    const AllWorkshop = await featuresWorkshop.query

    res.status(200).json({
        status: 'success',
        data: {
            Workshop: AllWorkshop,
        },
    })
})

exports.getWorkshop = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const workshop = await Workshop.findById(id)

    if (!workshop) return next(new ErrorHandler('Data not found', 404))

    res.status(200).json({
        status: 'success',
        data: {
            workshop,
        },
    })
})

exports.addWorkshop = catchAsync(async (req, res, next) => {
    let coverImageName, coverImage, image, imageName, workshop
    const contact = JSON.parse(req.body.contact)

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
            image: imageName,
            contact,
        }

        workshop = await Workshop.create(obj)
    } else {
        workshop = await Workshop.create({ ...req.body, contact })
    }

    res.status(201).json({
        status: 'success',
        data: {
            workshop,
        },
    })
})
