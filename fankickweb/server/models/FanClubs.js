var mongoose = require('mongoose')
var Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate');

var categoriesSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        autopopulate: true,
        ref: 'Categories'
    },
    subCategories: [Schema.Types.ObjectId]
})

var usersSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        autopopulate: true,
        ref: 'UserProfile'
    },
    type: String,
    isActive: Number,
    status: Number,
    mobileNumber: String,
    createdDate: Date,
    updatedDate: Date
}, { _id: false })

var favUsersSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        autopopulate: true,
        ref: 'UserProfile'
    },
    createdDateTime: Date
})

var fanClubSchema = Schema({
    name: String,
    celebrityName: String,
    imageUrl: String,
    fanClubIcon: String,
    description: String,
    userId: {
        type: Schema.Types.ObjectId,
        autopopulate: true,
        ref: 'UserProfile'
    },
    hashTag: String,
    keywords: String,
    latitude: String,
    longitude: String,
    locationName: String,
    createdDate: Date,
    updatedDate: Date,
    publicOrPrivate: { type: Boolean, default: false },
    requestToJoin: { type: Boolean, default: false },
    inviteMember: Number,
    catSubCategories: [categoriesSchema],
    users: [usersSchema],
    favUsers: [favUsersSchema],
    isCommercial: { type: Boolean, default: false },
    isDeleted:{ type: Boolean, default: false }
}, { versionKey: false, collection: 'FanClubs' })

fanClubSchema.plugin(autopopulate)

var FanClubs = mongoose.model('FanClubs', fanClubSchema)

exports = module.exports = FanClubs;