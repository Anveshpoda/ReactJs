var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');

//Category Schema
var categoriesSchema = Schema({
    _id: Schema.Types.ObjectId,
    subCategories: [Schema.Types.ObjectId]
});

var userProfileSchema = Schema({
    mobileNumber: { type: String },
    fullName: String,
    aboutYou: String,
    location: String,
    profileImage: String,
    referenceCode: String,
    referrelCode: String,
    createdDateTime: Date,
    modifiedDateTime: Date,
    latitude: Number,
    longitude: Number,
    deviceId: String,
    loginLocation: String,
    categories: [categoriesSchema],
    loginType: String,
    fbId: String,
    token: String,
    isVirtual: { type: Boolean, default: false }

}, { versionKey: false, collection: "UserProfile" });
userProfileSchema.plugin(autopopulate)

var users = mongoose.model('UserProfile', userProfileSchema);
exports = module.exports = users;