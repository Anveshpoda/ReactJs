var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StringRequired = {
    type: String,
    required: true
};

var userOpinionsSchema = Schema({
    questionId: Schema.Types.ObjectId,
    optionId: Number
}, { '_id': false })

var contentPackOpinionQuestionUserReviewSchema = Schema({
    userId: Schema.Types.ObjectId,
    contentPackDetailsId: Schema.Types.ObjectId,
    userOpinions: [userOpinionsSchema],
    createdDate: Date
}, { versionKey: false, collection: "ContentPackOpinionQuestionUserReview" });

var contentPackOpinionQuestionUserReview = mongoose.model('ContentPackOpinionQuestionUserReview', contentPackOpinionQuestionUserReviewSchema);
exports = module.exports = contentPackOpinionQuestionUserReview;