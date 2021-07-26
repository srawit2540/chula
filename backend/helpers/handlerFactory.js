const config = require('../config')

const catchAsync = require('./catchAsync')
const ErrorHandler = require('../utils/errorHandler')
const APIFeatures = require('../utils/apiFeatures')

exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id)
        if (popOptions) query = query.populate(popOptions)
        const doc = await query

        if (!doc) {
            return next(new ErrorHandler('No document found with that ID', 404))
        }

        res.status(200).json({
            status: 'success',
            data: doc,
        })
    })

exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {
        const filter = {}

        const features = new APIFeatures(Model.find(filter), req.query)
            .filter()
            .limitFields()
            .paginate()
            .sort()

        const doc = await features.query

        const page = +req.query.page || 1
        const limit = +req.query.limit || config.pageLimit

        const query = new APIFeatures()
            .excludedFields()
            .forEach((el) => delete req.query[el])

        const total = await Model.countDocuments(query)

        res.status(200).json({
            status: 'success',
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            perPage: limit,
            data: doc,
        })
    })

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id)

        if (!doc) {
            return next(new AppError('No document found with that ID', 404))
        }

        res.status(204).json({
            status: 'success',
            data: null,
        })
    })

exports.updateOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        if (!doc) {
            return next(new AppError('No document found with that ID', 404))
        }

        res.status(200).json({
            status: 'success',
            data: doc,
        })
    })

exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body)

        res.status(201).json({
            status: 'success',
            data: doc,
        })
    })
