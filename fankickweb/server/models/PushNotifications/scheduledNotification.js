var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduledNotificationModel = function () {
    var scheduledSchema = Schema({
        type: String,
        category: String,
        users: Array,
        title: String,
        description: String,
        imageUrl: String,
        location: Array,
        locationTags: Array,
        targetUserCategory: String,
        targetUserSubcat: String,
        targetUserCategoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Categories'
        },
        targetUserSubcatId: Schema.Types.ObjectId,
        targetActivity: String,
        performed: String,
        forCelebrity: String,
        celebrityName: String,
        within: String,
        days: Number,
        startDays: Number,
        endDays: Number,
        range: String,
        likesCount: Number,
        startLikesCount: Number,
        endLikesCount: Number,
        createdDate: { type: Date, default: Date.now },
        scheduledDate: Date,
        schedule: String,
        status: Boolean
    }, { versionKey: false, collection: "ScheduledNotifications" });
    return mongoose.model("ScheduledNotifications", scheduledSchema);
}
module.exports = new scheduledNotificationModel();