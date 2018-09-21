var mongoose = require('mongoose')
var Schema = mongoose.Schema

var dataAnalyticsSchema = Schema({
   ipAddress: String,
   userId: Schema.Types.ObjectId,
   mobileNumber: String,
   methodType: String,
   url: String,
   params: String,
   body: String,
   headers: String,
   createdDate: Date
}, { versionKey: false, collection: "DataAnalytics" })

var analytics = mongoose.model('DataAnalytics', dataAnalyticsSchema)

module.exports = analytics