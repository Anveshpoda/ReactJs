var mongoose = require('mongoose')
var Schema = mongoose.Schema

var commentsShema = Schema({
    comment: String,
    userId: { type: Schema.Types.ObjectId, ref: 'UserProfile' },
    createdDateTime: { type: Date, default: Date.now },
    updatedDateTime: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }
})

var categoriesSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    },
    subCategories: [Schema.Types.ObjectId]
})

var funClubJokesSchema = Schema({
    funClubId: { type: Schema.Types.ObjectId, ref: 'FunClubs' },
    type: String,
    jokeDescription: String,
    celebrityName: [String],
    catSubCategories: [categoriesSchema],
    jokesUrl: String,
    thumbnail: String,
    language: String,
    location: [String],
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    likes: [{ type: Schema.Types.ObjectId, ref: 'UserProfile' }],
    comments: [commentsShema],
}, { versionKey: false, collection: 'FunClubJokes' })

var funClubJokes = mongoose.model('FunClubJokes', funClubJokesSchema)

exports = module.exports = funClubJokes