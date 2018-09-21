var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StringRequired = {
    type: String,
    required: true
};


var contentPackUserPointsSchema = Schema({
    _id: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    points : Number,
    createdDateTime: {type : Date, Default : Date.now()},
    modifiedDateTime: Date
},{versionKey: false ,  collection: "ContentPackUserPoints" });

var contentPackUserPoints = mongoose.model('ContentPackUserPoints', contentPackUserPointsSchema);
exports = module.exports = contentPackUserPoints;