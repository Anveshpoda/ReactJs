var mongoose = require('mongoose')
var Schema = mongoose.Schema

var scheduledNotificationsSchema = new Schema({
    status: {type:Number},
    scheduledDate:{ type: Date, default: Date.now },
    sentDate:Date,
    message:String,
    title:String,
    imageUrl:String,
    type:String,
    uniqueId:Schema.Types.ObjectId
}, { versionKey: false, collection: "ScheduledNotification" })

var scheduledNotificationsSchemaModel = mongoose.model('ScheduledNotification', scheduledNotificationsSchema)
exports = module.exports = scheduledNotificationsSchemaModel