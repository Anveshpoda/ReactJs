var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StringRequired = {
    type: String,
    required: true
};

var contentPackViewPollingSchema = Schema({
    _id: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    contentPackDetailsId: Schema.Types.ObjectId,
    isViewd: Number,
    isAnswered: Number,
},{ versionKey: false , collection: "ContentPackViewPolling" });

var contentPackViewPolling = mongoose.model('ContentPackViewPolling', contentPackViewPollingSchema);
exports = module.exports = contentPackViewPolling;