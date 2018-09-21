var mongoose = require('mongoose')
var Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate');
var couponsDataSchema = Schema({
    couponCode: String,
    pin: String,
    couponStatus: Boolean,
    couponBeginDate: Date,
    couponEndDate: Date,
    userId: { type: Schema.Types.ObjectId, ref: 'UserProfile', autopopulate: true },
    redemptionDate: Date
})

var couponInfoSchema = Schema({
    valueType: String,
    couponFrom: String,
    couponDescription: String,
    couponCost: Number,
    fanCoins: Number,
    couponType: String,
    couponImageUrl: String,
    couponImage: String,
    couponIcon: String,
    couponsData: [couponsDataSchema],
    termsAndConditions: String,
    brandAndroidUrl: String,
    brandIosUrl: String,
    brandWebUrl: String,
    limit: Number,
    type: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: "CouponInfo" })


couponInfoSchema.plugin(autopopulate)
var couponInfo = mongoose.model('CouponInfo', couponInfoSchema)

module.exports = couponInfo