var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationCatWebModel = function () {

    var notificationCatWebSchema = Schema({
        _id: Schema.Types.ObjectId,
        name: String,
        nTypeId: { type: Schema.Types.ObjectId, ref: 'NotificationTypesWeb' }
    }, { versionKey: false, collection: "NotificationCategoriesWeb" })

    return mongoose.model("NotificationCategoriesWeb", notificationCatWebSchema);
}
module.exports = new notificationCatWebModel();