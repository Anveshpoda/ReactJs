var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewMessagesModel = function () {
    var commentsSchema = Schema({
        commentedBy: { type: Schema.Types.ObjectId },
        commentedUsername: String,
        imageUrl: String,
        role: String,
        message: String,
        // _id: { type: Schema.Types.ObjectId }
    });
    var messagesSchema = Schema({
        toWhom: { type: Schema.Types.ObjectId },
        approveStatus: { type: Boolean, default: false },
        readOrUnread: { type: Boolean, default: false }
    }, { _id: false });

    var statusMessageSchema = Schema({
        message: String,
        createdDate: { type: Date, default: Date.now }
    }, { _id: false });

    var reviewMsgsSchema = Schema({
        sentBy: String,
        imageUrl: String,
        senderUserId: { type: Schema.Types.ObjectId },
        MessageToWhom: [messagesSchema],
        //sentDate: { type: Date, default: Date.now },
        module: String,
        createdPackId: { type: Schema.Types.ObjectId },
        comments: [commentsSchema],
        review: { type: Boolean, default: false },
        messages: [statusMessageSchema]
    }, { versionKey: false, collection: "ApprovalCycleMessages" });

    return mongoose.model("ApprovalCycleMessages", reviewMsgsSchema);
}

module.exports = new reviewMessagesModel();