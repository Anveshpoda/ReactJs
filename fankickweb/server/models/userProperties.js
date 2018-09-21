var mongoose = require('mongoose')
var Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate');

var updatedLocationSchema = Schema({
    latitude: String,
    longitude: String,
    loginState: String,
    currentLocation: String
}, { _id: false })

var userPropertiesSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile', autopopulate: true
    },
    latitude: String,
    longitude: String,
    currentLocation: String,
    loginState: String,
    deviceInfo: {
        deviceModel: String,
        deviceOsVersion: String,
        appVersion: String,
        operator: String,
        carrier: String,
        wifi: Boolean,
        imei: String,
        deviceType: String,
        anIdOrUId: String,
        installType: String,
        mediaSource: String
    },
    contentPacks: {
        celebrities: [{
            name: String,
            count: Number,
            _id: false
        }],
        categories: [{
            id: {
                type: Schema.Types.ObjectId,
                ref: 'Categories'
            },
            count: Number,
            _id: false
        }],
        subCategories: [{
            id: Schema.Types.ObjectId,
            count: Number,
            _id: false
        }]
    },
    fanClub: {
        location: [String],
        celebrities: [{
            name: String,
            count: Number,
            _id: false
        }],
        categories: [{
            id: {
                type: Schema.Types.ObjectId,
                ref: 'Categories'
            },
            count: Number,
            _id: false
        }],
        subCategories: [{
            id: Schema.Types.ObjectId,
            count: Number,
            _id: false
        }]
    },
    contests: {
        location: [String],
        celebrities: [{
            name: String,
            count: Number,
            _id: false
        }],
        categories: [{
            id: {
                type: Schema.Types.ObjectId,
                ref: 'Categories'
            },
            count: Number,
            _id: false
        }],
        subCategories: [{
            id: Schema.Types.ObjectId,
            count: Number,
            _id: false
        }]
    },
    pinnedCelebs: [{
        name: String,
        count: Number,
        _id: false
    }],
    updatedLocation: [updatedLocationSchema],
    lastActiveTime: [Date]
}, { versionKey: false, collection: "UserProperties" })
userPropertiesSchema.plugin(autopopulate)
var userProperties = mongoose.model('UserProperties', userPropertiesSchema)
exports = module.exports = userProperties