var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSubCatModel = function () {
    var notificationSubCatSchema = Schema({
        _id: Schema.Types.ObjectId,
        name: String,
        sTypeId: { type: Schema.Types.ObjectId, ref: 'NotificationCategoriesWeb' },
        cTypeId: { type: Schema.Types.ObjectId, ref: 'NotificationCategoriesWeb' }
    }, { versionKey: false, collection: "NotificationSubCategoryWeb" })

    return mongoose.model("NotificationSubCategoryWeb", notificationSubCatSchema);
}

module.exports = new notificationSubCatModel();