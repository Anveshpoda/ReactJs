var mongoose = require('mongoose')
var Schema = mongoose.Schema

var categoriesSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    },
    subCategories: [Schema.Types.ObjectId]
})

var funClubSchema = Schema({
    celebrityName: String,
    funClubImageUrl: String,
    funClubDescription: String,
    catSubCategories: [categoriesSchema],
    funClubName: String,
    location: [String],
    followers: [{ type: Schema.Types.ObjectId, ref: 'UserProfile' }],
}, { versionKey: false, collection: 'FunClubs' })

var FunClubs = mongoose.model('FunClubs', funClubSchema)

exports = module.exports = FunClubs;