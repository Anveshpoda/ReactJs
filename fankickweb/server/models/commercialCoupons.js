var mongoose = require('mongoose')
var Schema = mongoose.Schema

var couponsDataSchema = Schema({
    couponCode: String,
    pin: String,
    couponStatus: Boolean,
    couponBeginDate: Date,
    couponEndDate: Date,
    userId: { type: Schema.Types.ObjectId, ref: 'UserProfile' },
    redemptionDate: Date
})

var commercialCouponsSchema = Schema({
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
    brandWebUrl: String
}, { versionKey: false, collection: "CommercialCoupons" })

var commercialCoupons = mongoose.model('CommercialCoupons', commercialCouponsSchema)

module.exports = commercialCoupons