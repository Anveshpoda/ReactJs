var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stateSchema = function () {
    var stateschema = Schema({
        location: String
    }, { versionKey: false, collection: "Locations" })
    return mongoose.model("Locations", stateschema)
}
module.exports = new stateSchema();