var mongoose = require('mongoose')
var Schema = mongoose.Schema

var feedsSchema = Schema({

}, { _id: false })

var smSchema = new Schema({
    categoryId: { type: Schema.Types.ObjectId },
    subCategoryId: { type: Schema.Types.ObjectId },
    celebrityName: String,
    //socialChannel: String,
    expiryDate: { type: Date },
    //location: { type: Array },
    locationTags: { type: Array },
    feedId: String,
    type: String,
    text: String,
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    imageUrl: String,
    feedType: String,
    videoUrl: String,
    description: String,
    ownerName: String,
    ownerImageUrl: String
}, { versionKey: false, collection: "SocialMediaFeeds" })

var socialMediaFeedsModel = mongoose.model('SocialMediaFeeds', smSchema)
exports = module.exports = socialMediaFeedsModel

