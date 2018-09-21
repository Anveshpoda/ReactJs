var mongoose = require('mongoose');
var Schema = mongoose.Schema;

CoinSourceSchema = Schema({
    fun2win: {
        like: {
            id: String,
            points: Number
        },
        comment: {
            id: String,
            points: Number
        },
        share: {
            id: String,
            facebook: Number,
            twitter: Number,
            instagram: Number,
            level: Number
        },
        expireDate: Date,
        noftifyBeforeExpire: String
    },
    contests: {
        like: {
            id: String,
            points: Number,
            level: Number
        },
        comment: {
            id: String,
            points: Number,
            level: Number
        },
        participation: {
            id: String,
            points: Number
        },
        share: {
            id: String,
            facebook: Number,
            twitter: Number,
            instagram: Number,
            level: Number
        },
        expireDate: Date,
        noftifyBeforeExpire: String
    },
    fanActivity: {
        refer: {
            id: String,
            points: Number,
            expireDate: Date,
            noftifyBeforeExpire: String

        },
        createProfile: {
            id: String,
            points: Number,
            expireDate: Date,
            noftifyBeforeExpire: String
        },
        createEvent: {
            id: String,
            points: Number,
            expireDate: Date,
            noftifyBeforeExpire: String
        }
    },
    fanClubs: {
        like: {
            id: String,
            points: Number,
            level: Number
        },
        comment: {
            id: String,
            points: Number,
            level: Number
        },
        share: {
            id: String,
            facebook: Number,
            twitter: Number,
            instagram: Number,
            level: Number,
            isSelected:Array
        },
        expireDate: Date,
        noftifyBeforeExpire: String
    }
}, { versionKey: false, collection: "CoinsConfiguration" });

var coinSourceModel = mongoose.model('CoinsConfiguration', CoinSourceSchema);

module.exports = coinSourceModel;