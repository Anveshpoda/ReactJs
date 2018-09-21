var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customNotificationModel = function () {
    var customNotificationSchema = Schema({
        type: String,
        category: String,
        users: Array,
        title: String,
        description: String,
        imageUrl: String,
        location: Array,
        locationTags:Array,
        targetUserCategory:String,
        targetUserSubcat:String,
        targetActivity:String,
        performed:String,
        forCelebrity:String,
        celebrityName:String,
        within:String,
        days:Number,
        startDays:Number,
        endDays:Number,
        range:String,
        likesCount:Number,
        startLikesCount:Number,
        endLikesCount:Number,
        createdDate: { type: Date, default: Date.now }
    }, { versionKey: false, collection: "CustomNotifications" });

    return mongoose.model("CustomNotifications", customNotificationSchema);
}

module.exports = new customNotificationModel();