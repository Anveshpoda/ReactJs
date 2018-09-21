var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var keywordModel = function () {
    var keywordSchema = Schema({
        keyWords: String,
        type: String,
        keyWordsFor: String
    }, { versionKey: false, collection: "KeyWords" });

    return mongoose.model("KeyWords", keywordSchema);
}

module.exports = new keywordModel()