var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');

var likesShema = Schema({
    userId: { type: Schema.Types.ObjectId, autopopulate: true, ref: 'UserProfile' },
    createdDateTime: Date
})

var commentsShema = Schema({
    comment: String,
    parentCommentId: Schema.Types.ObjectId,
    userId: { type: Schema.Types.ObjectId, autopopulate: true, ref: 'UserProfile' },
    createdDateTime: Date,
    updatedDateTime: Date,
    isDeleted: { type: Boolean, default: false },
    junkComment: { type: Boolean, default: false },
    featuredComment: { type: Boolean, default: false }
})

var fanClubFeedSchema = Schema({
    fanClubId: { type: Schema.Types.ObjectId, autopopulate: true, ref: 'FanClubs' },
    type: String,
    description: String,
    feedUrl: String,
    thumbnail: String,
    createdUser: { type: Schema.Types.ObjectId, autopopulate: true, ref: 'UserProfile' },
    likes: [likesShema],
    comments: [commentsShema],
    createdDateTime: Date,
    updatedDateTime: Date,
    isDeleted: { type: Boolean, default: false },
    junkFeed: { type: Boolean, default: false },
    featuredPost: { type: Boolean, default: false }
}, { versionKey: false, collection: "FanClubFeed" });

fanClubFeedSchema.plugin(autopopulate)

var fanClubFeedModel = mongoose.model('FanClubFeed', fanClubFeedSchema);
exports = module.exports = fanClubFeedModel;