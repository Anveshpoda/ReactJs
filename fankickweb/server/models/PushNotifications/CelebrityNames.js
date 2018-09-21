var mongoose = require('mongoose')
var Schema = mongoose.Schema

var pinnedUsersSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile'
    },
    createdDateTime: Date
}, { _id: false })

var commentsSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile'
    },
    comment: String,
    hashTag: String,
    createdDateTime: Date,
    updatedDateTime: Date
})

var photosSchema = Schema({
    photosImageUrl: String
})

var trailersSchema = Schema({
    trailerThumbnail: String,
    trailerUrl: String
})

var songsSchema = Schema({
    songThumbnail: String,
    songUrl: String
})

var celebrityPageSchema = Schema({
    celebrityName: String,
    description : String,
    celebrityImageUrl: String,
    occupation: String,
    gender: String,
    country: String,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    },
    categoryName: String,
    subCategoryId: [Schema.Types.ObjectId],
    subCategoryName: String,
    location: [String],
    createdDateTime: Date,
    updatedDateTime: Date,
    pinnedUsers: [pinnedUsersSchema],
    comments: [commentsSchema],
    photos: [photosSchema],
    trailers: [trailersSchema],
    songs: [songsSchema]
}, { versionKey: false, collection: 'CelebrityPage' })

var celebrityPage = mongoose.model('CelebrityPage', celebrityPageSchema)

exports = module.exports = celebrityPage;