var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');

const priorArray = [1, 2, 3];

var SocialShareSchema = new Schema({
    targetAudience: { type: String, required: [true, 'please enter targetAudience'], max: '100' },
    ageBetween: { type: String, required: [true, 'please enter ageBetween'] },
    gender: { type: String, required: [true, 'please enter gender'], trim: true },
    targetLocation: { type: Array },
}, { _id: false });

var likesSchema = Schema({
    feedId: Schema.Types.ObjectId,
    userId: { type: Schema.Types.ObjectId, ref: 'UserProfile' }
});

var commentsSchema = Schema({
    commentData: String,
    commentDate: Date,
    updatedDate: Date,
    userId: { type: Schema.Types.ObjectId, ref: 'UserProfile' },
    isDeleted: { type: Boolean, default: false }
})
var castSchema = Schema({
    imageUrl: String,
    actorName: String,
    dept: String
}, { _id: false })

var crewSchema = Schema({
    imageUrl: String,
    actorName: String,
    dept: String
}, { _id: false })

var aboutlikesSchema = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'UserProfile' }
});
var feedDetailsSchema = Schema({
    feedData: { type: String, required: [true, 'please enter feedData'], trim: true, max: '500' },
    feedDescription: { type: String },
    thumbnail: { type: String },
    createdDate: Date,
    updatedDate: Date,
    feedType: { type: String, required: [true, 'please enter feedType'] },
    feedTypeId: {
        type: String,
        refPath: 'MessageCenterTypes.typeId'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile',
        autopopulate: true
    },
    isDeleted: { type: Boolean, default: false },
    likes: [likesSchema],
    comments: [commentsSchema],
    viewsCount: Number,
    junkFeed: { type: Boolean, default: false },
    junkPriority: { type: Number },
    featuredPost: { type: Boolean, default: false },
    priority: { type: Number, enum: priorArray }
});
var AboutMovieSchema = Schema({
    movieName: String,
    tags: { type: Array },
    releaseDate: String,
    movieDuration: String,
    aboutMovielikes: [aboutlikesSchema],
    synopsis: String,
    cast: [castSchema],
    crew: [crewSchema]
}, { _id: false })

var contestsSchema = Schema({
    isLocationBased: Boolean,
    audioUrl: { type: String },
    title: String,
    description: String,
    locationIds: [{ type: Schema.Types.ObjectId, ref: 'contestLocations', autopopulate: true }],
    frames: { type: Array },
    lyricsUrl: { type: String }
}, { _id: false })

var contestSchema = Schema({
    contestTitle: { type: String, required: [true, 'please enter contestTitle'], trim: true, max: '100' },
    contestTypeIds: String,
    contestDescription: { type: String, required: [true, 'please enter contestDescription'], trim: true, max: '300' },
    isCommercial: { type: Boolean, required: [true, 'please mention wheather the contest commercial or not - isCommercial is Required'] },
    contestIcon: { type: String },
    contestImageUrl: { type: String, required: [true, 'please enter contestImageUrl'], trim: true, },
    contestVideoUrl: { type: String },
    contestPoints: { type: Number, required: [true, 'please enter contestPoints'] },
    buttonText: String,
    termsAndConditions: { type: String, required: [true, 'please enter termsAndConditions'], trim: true, max: '150' },
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: Date.now() },
    offers: String,
    contestEndDate: { type: Date },
    contestStartDate: { type: Date },
    isPublished: Boolean,
    offers: String,
    inAppType: Number,
    feedDetails: [feedDetailsSchema],
    socialShare: SocialShareSchema,
    aboutMovie: AboutMovieSchema,
    contestThumbnail: String,
    isDeleted: Boolean,
    isLocationBased: { type: Boolean },
    contestCaption: String,
    order: { type: Array },
    isMoviePromotion: { type: Boolean },
    dubshmash: contestsSchema,
    karoke: contestsSchema,
    frame: contestsSchema,
    poster: contestsSchema,
    toScratch: Boolean,
    entry: Number,
    isLocationBasedcontest: Boolean,
    noOfwinners: Number,
    
    contestLocationIds: [{ type: Schema.Types.ObjectId }]
}, { versionKey: false, collection: 'McContestDetails' });


contestSchema.plugin(autopopulate)
var messageCenter = mongoose.model('McContestDetails', contestSchema);

exports = module.exports = messageCenter;
