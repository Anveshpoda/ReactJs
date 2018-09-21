var mongoose = require('mongoose')
var Schema = mongoose.Schema
var autoPopulate=require('mongoose-autopopulate');

FanCoinsSchema = Schema({
    reasonId: {
        type: Schema.Types.ObjectId,
        ref: 'CoinSource'
    },
    userId: {
        type: Schema.Types.ObjectId,
        autoPopulate:true,
        ref: 'UserProfile'
    },
    coins: Number,
    createdDate: Date,
    sourceId: Schema.Types.ObjectId,
    fanClubId: Schema.Types.ObjectId
}, { versionKey: false, collection: "FanCoins" })

var fanCoinsModel = mongoose.model('FanCoins', FanCoinsSchema)

module.exports = fanCoinsModel;