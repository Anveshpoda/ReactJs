var mongoose = require('mongoose')
var Schema = mongoose.Schema

var likeSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile'
    },
    createdDate: Date
})

var commentSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile'
    },
    comment: String,
    commentDate: Date,
    commentUpdatedDate: Date,
    isDeleted: Boolean
})

var shareSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile'
    },
    postId: String,
    type: String,
    message: String,
    createdDate: Date
})


/* 
    goodieType - 1 for Coupons , 2 - for Coins , 3 for Both
    contestUrl - Actual imageUrl/videoUrl to share in Facebook
    contestThumbnail - if it is Video type contestType use this key if needed
    declareWinnersType - 1 for immediate after contestEndDate , 2 for Manual declaring by calling service

*/
var facebookContestsSchema = Schema({
    fbContestName: String,
    title: String,
    caption: String,
    description: String,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    },
    subCategoryId: {
        type: Schema.Types.ObjectId
    },
    celebrityName: String,
    location: [{
        type: String,
        refPath: 'Locations.location',
        trim: true
    }],
    contestType: String,
    contestUrl: String,
    fbContestThumbnail: String,
    fbContestVideoUrl: String,
    isYoutubeVideo: Boolean,
    brandLogo: String,
    buttonText: String,
    rewardLogo: String,
    winningMessage: String,
    contestStartDate: Date,
    contestEndDate: Date,
    contestStatus: Boolean,
    likes: [likeSchema],
    comments: [commentSchema],
    shares: [shareSchema],
    goodieType: Number,
    declareWinnersType: Number,
    winners: [],
    prizeCoins: Number,
    winnersCount: Number,
    couponFrom: String,
    couponCost: Number,
    createdDate: Date,
    updatedDate: Date,
    isDeleted: Boolean,
    termsAndConditions: String,
    userguideText : String,
    basicCoins : Number,
    coinsConfig : Boolean
}, {
    versionKey: false,
    collection: "FacebookContests"
})

var facebookContests = mongoose.model('FacebookContests', facebookContestsSchema)

module.exports = facebookContests