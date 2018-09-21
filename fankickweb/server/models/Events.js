var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');

var participantsSchema = Schema({
    userId: { type: Schema.Types.ObjectId, autopopulate:true, ref: 'UserProfile' },
    mobileNumber: String,
    participantStatus: Number,
    statusDateTime: Date
});

var likesSchema = Schema({
    userId: { type: Schema.Types.ObjectId, autopopulate:true, ref: 'UserProfile' },
    createdDateTime : Date
})

var commentsSchema = Schema({
    userId: { type: Schema.Types.ObjectId, autopopulate:true, ref: 'UserProfile' },
    parentCommentId : { type: Schema.Types.ObjectId, autopopulate:true, refPath: 'FanClubEvents.comments' },
    comment : String,
    createdDateTime : Date 
})

var fanClubEventSchema = Schema({
    userId: { type: Schema.Types.ObjectId, autopopulate:true, ref: 'UserProfile' },
    fanClubId: { type: Schema.Types.ObjectId, autopopulate:true, ref: 'FanClubs' },
    eventTitle: String,
    eventDescription: String,
    eventStartDateTime: Date,
    eventEndDateTime: Date,
    createdDateTime: Date,
    modifiedDateTime: Date,
    eventStatusId: Number,
    eventLocation: String,
    eventImageUrl: String,
    rsvpFlag: Boolean,
    rsvpDateTime: String,
    latitude: Number,
    longitude: Number,
    featured:Boolean,
    participantUsers: [participantsSchema],
    likes: [likesSchema],
    comments: [commentsSchema]
}, { versionKey: false, collection: "FanClubEvents" });

fanClubEventSchema.plugin(autopopulate)

var fanClubEventsModel = mongoose.model('FanClubEvents', fanClubEventSchema);
exports = module.exports = fanClubEventsModel;