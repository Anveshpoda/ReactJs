var mongoose = require('mongoose')
var Schema = mongoose.Schema

var contentPacksModel = function () {

    var contentPackQuestionSchema = Schema({
        name: String,
        imageURL: String,
        questionCategory: String,
        questionType: String,
        option1: String,
        optionId1: Number,
        option2: String,
        optionId2: Number,
        option3: String,
        optionId3: Number,
        option4: String,
        optionId4: Number,
        correctAnswer: Number,
        createdDateTime: Date,
        modifiedDateTime: Date

    })

    var userActionSchema = Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'UserProfile'
        },
        isViewed: Number,
        isLiked: Number,
        isAnswered: Number
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

    var contentPackDetailsSchema = Schema({
        name: String,
        celebrityName: String,
        imageURL: String,
        description: String,
        duration: Number,
        points: Number,
        createdDateTime: { type: Date, Default: Date.now() },
        modifiedDateTime: { type: Date, Default: Date.now() },
        likesCount: Number,
        commentsCount: Number,
        userActions: [userActionSchema],
        comments: [commentSchema],
        categoryId: Schema.Types.ObjectId,
        subCategoryId: Schema.Types.ObjectId,
        isPublished: Boolean,
        isDeleted: Boolean,
        toScratch: Boolean,
        entry: Number,
        contentPackQuestions: [contentPackQuestionSchema],
        isBranded: { type: Boolean, default: false },
        brandName: String,
        brandIconUrl: String,
        brandAndroidUrl: String,
        brandIosUrl: String,
        brandWebUrl: String,
        brandText: String,
        createdBy: { type: Schema.Types.ObjectId, ref: 'UsersWeb' }

    }, { versionKey: false, collection: "ContentPackDetails" })

    return mongoose.model('ContentPackDetails', contentPackDetailsSchema)
}

// module.exports = new contentPacksModel();











