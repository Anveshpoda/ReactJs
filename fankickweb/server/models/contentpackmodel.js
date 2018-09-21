var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = require('mongodb').ObjectID

const optionsTypeEnum = ['POLL', 'THREEIMAGE', 'GRID', 'COMBINATION', 'MULTIPLE'];

const answerTypeEnum = ['QUESTION', 'OPINION'];

const mediaTypeEnum = ['text', 'image', 'audio', 'video'];

const optionMediaTypeEnum = ['text', 'image']

var contentPackQuestionSchema = Schema({
    mediaType: {
        type: String,
        enum: mediaTypeEnum
    },
    mediaURL: String,
    video: {
        thumbnail: String,
        source: String,
        startTime: {
            type: Number,
            Default: 0
        },
        endTime: {
            type: Number,
            Default: 0
        },
    },
    subQuestions: [{
        name: String,
        optionsType: {
            type: String,
            enum: optionsTypeEnum
        },
        answerType: {
            type: String,
            enum: answerTypeEnum,
            required: true
        },
        optionMediaType: {
            type: String,
            enum: optionMediaTypeEnum,
            required: true
        },
        options: [{
            option: String,
            optionId: Number,
            count: {
                type: Number,
                Default: 0
            }
        }],
        correctAnswer: {
            type: Number,
            Default: 0
        },
    }]
})
var userActionSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile'
    },
    isViewed: Number,
    isLiked: Number,
    isAnswered: Number,

    lastVisitDate: Date,
    lastLikedDate: Date,
    lastAnsweredDate: Date
})

var userFeedbackSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile'
    },
    like: Number,
    createdDate: {
        type: Date,
        Default: Date.now()
    },
    updatedDate: Date
})


var commentSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile'
    },
    comment: String,
    commentDate: Date,
    commentUpdatedDate: Date,
    isDeleted: Boolean
})

const levelENUM = ['EASY', 'MEDIUM', 'HARD', 'RAPID-FIRE'];

var contentPackDetailsSchema = Schema({
    name: String,
    celebrityName: String,
    imageURL: String,
    description: String,
    duration: Number,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'UsersWeb',
        Default: ObjectId('000000000000000000000000')
    },
    points: Number,
    createdDateTime: {
        type: Date,
        Default: Date.now()
    },
    modifiedDateTime: Date,
    totalViewsCount: {
        type: Number,
        default: 0
    },
    likesCount: {
        type: Number,
        default: 0
    },
    answeredCount: {
        type: Number,
        default: 0
    },
    userActions: [userActionSchema],
    userFeedbacks: [userFeedbackSchema],
    comments: [commentSchema],
    categoryId: Schema.Types.ObjectId,
    subCategoryId: Schema.Types.ObjectId,
    isPublished: Boolean,
    isDeleted: Boolean,
    toScratch: Boolean,
    entry: Number,
    contentPackQuestions: [contentPackQuestionSchema],
    isBranded: {
        type: Boolean,
        default: false
    },
    brandName: String,
    brandIconUrl: String,
    brandAndroidUrl: String,
    brandIosUrl: String,
    brandWebUrl: String,
    brandText: String,
    level: {
        type: String,
        enum: levelENUM,
        trim: true,
        uppercase: true,
        required: true,
        default: 'EASY'
    },
    isRapidFire: {
        type: Boolean,
        default: false
    },
    hasGoodies: {
        type: Boolean,
        default: false
    },
    goodieCoins: Number
}, {
        versionKey: false,
        collection: "ContentPackDetails"
    })

var contentPackDetails = mongoose.model('ContentPackDetails', contentPackDetailsSchema)

module.exports = contentPackDetails