var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userGroupModel = function () {
    var userGroupSchema = Schema({
        _id: { type: Schema.Types.ObjectId },
        name: String
    }, { versionKey: false, collection: "WebUserGroups" })
    return mongoose.model("WebUserGroups", userGroupSchema);
}

module.exports = new userGroupModel();