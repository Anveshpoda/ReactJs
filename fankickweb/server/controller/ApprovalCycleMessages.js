var Messages = require('../models/ApprovalCycleMessages');
var VerifyToken = require('../security/TokenVerification');
const moment = require('moment-timezone');
var Users = require('../models/user');

module.exports = function (app) {
    app.post('/approvalCycle/messages', VerifyToken, (req, res) => {
        var input = req.body;
        var msg = new Messages(input);
        msg.save((err) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            else {
                var data = msg.toObject();
                //data.messages.createdDate = moment(msg.messages.createdDate).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.get('/approvalCycle/messagesList/:id/:number', VerifyToken, (req, res) => {
        Messages.find({ "MessageToWhom.toWhom": req.params.id }).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).exec((err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                Messages.count({ "MessageToWhom.toWhom": req.params.id }, (err, c) => {
                    console.log("numofPages", (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1))
                    res.json({ status: 200, message: "Success", data: data, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) })
                })
            }
        })
    })
    app.post('/approvalCycle/comments/:id', VerifyToken, (req, res) => {
        var input = req.body;
        Messages.findOne({ _id: req.params.id }).exec((err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                if (data.comments.length <= 1) {
                    data.MessageToWhom.push({
                        toWhom: data.senderUserId,
                        readOrUnread: false,
                        approveStatus: false
                    })
                }
                data.comments.push({
                    commentedBy: input.commentedBy,
                    commentedUsername: input.commentedUsername,
                    imageUrl: input.imageUrl,
                    role: input.role,
                    message: input.message
                })
                data.save((err1) => {
                    if (err1) {
                    } else {
                    }
                })
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.post('/approvalCycle/storeMessages/:id', VerifyToken, (req, res) => {
        var input = req.body;
        Messages.findOne({ _id: req.params.id }, (err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                data.messages.push({
                    message: input.message,
                    createdDate: input.createdDate
                });
                data.MessageToWhom.map((item) => item.readOrUnread = false);
                data.review = false;
                data.save((err1) => {
                    if (err1) {
                    } else {
                    }
                })
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.get('/approvalCycle/readStatus/:id/:personId', VerifyToken, (req, res) => {
        Messages.findOneAndUpdate({ _id: req.params.id, "MessageToWhom.toWhom": req.params.personId },
            { $set: { "MessageToWhom.$.readOrUnread": true } }, { new: true }).exec((err, data) => {
                if (err) res.json({ status: 404, message: "Failure", data: err })
                if (data) {
                    res.json({ status: 200, message: "Success", data: data })
                }
            })
    })
    app.get('/approvalCycle/messagesDisplay/:id', VerifyToken, (req, res) => {
        Messages.findOne({ _id: req.params.id }).exec((err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                var arr = [];
                for (let i = 0; i < data.messages.length; i++) {
                    if (i == 0) {
                        arr.push({
                            message: data.messages[i].message,
                            name: data.sentBy,
                            imageUrl: data.imageUrl,
                            createdDate: data.messages[i].createdDate
                        })
                    } else {
                        arr.push({
                            message: data.messages[i].message,
                            name: "Fankick Admin",
                            imageUrl: "https://fankickdev.blob.core.windows.net/images/UrAycxgHF4.png",
                            createdDate: data.messages[i].createdDate
                        })
                    }
                }
                res.json({ status: 200, message: "Success", data: arr })
            }
        })
    })
    app.get('/approvalCycle/readMessages/:id/:number', VerifyToken, (req, res) => {
        Messages.find({ MessageToWhom: { $elemMatch: { toWhom: req.params.id, readOrUnread: true } } })
            .skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).exec((err, data) => {
                if (err) res.json({ status: 404, message: "Failure", data: err })
                if (data) {
                    Messages.count({ MessageToWhom: { $elemMatch: { toWhom: req.params.id, readOrUnread: true } } }, (err, c) => {
                        res.json({ status: 200, message: "Success", data: data, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) })
                    })
                }
            })
    })
    app.get('/approvalCycle/unreadMessages/:id/:number', VerifyToken, (req, res) => {
        Messages.find({ MessageToWhom: { $elemMatch: { toWhom: req.params.id, readOrUnread: false } } })
            .skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).exec((err, data) => {
                if (err) res.json({ status: 404, message: "Failure", data: err })
                if (data) {
                    Messages.count({ MessageToWhom: { $elemMatch: { toWhom: req.params.id, readOrUnread: false } } }, (err, c) => {
                        res.json({ status: 200, message: "Success", data: data, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) })
                    })
                }
            })
    })
    app.get('/approvalCycle/sentMessages/:id/:number', VerifyToken, (req, res) => {
        Messages.find({ senderUserId: req.params.id }).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).exec((err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                Messages.count({ senderUserId: req.params.id }, (err, c) => {
                    res.json({ status: 200, message: "Success", data: data, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) })
                })
            }
        })
    })
    app.get('/approvalCycle/displayComments/:id', VerifyToken, function (req, res) {
        Messages.findById(req.params.id, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                res.json({ status: 200, message: "Success", data: data.comments })
            }
        });
    })
    app.get('/approvalCycle/reviewCount/:personId', VerifyToken, (req, res) => {
        Messages.find({ review: true, "MessageToWhom.toWhom": req.params.personId }, (err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                var count = 0;
                for (let i of data) {
                    for (let j of i.MessageToWhom) {
                        if (String(j.toWhom) === String(req.params.personId)) {
                            if (j.readOrUnread === false)
                                count += 1;
                        }
                    }
                }
                res.json({ status: 200, message: "Success", data: count })
            }
        })
    })
    app.get('/approvalCycle/totalCount/:personId', VerifyToken, (req, res) => {
        Messages.find({ "MessageToWhom.toWhom": req.params.personId }, (err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                var count = 0;
                for (let i of data) {
                    for (let j of i.MessageToWhom) {
                        if (String(j.toWhom) === String(req.params.personId)) {
                            if (j.readOrUnread === false)
                                count += 1;
                        }
                    }
                }
                res.json({ status: 200, message: "Success", data: count })
            }
        })
    })
    app.post('/approvalCycle/usersList', VerifyToken, (req, res) => {
        var groupId = req.body.groupId;
        var userId = req.body.userId;
        Users.find({ groupId: groupId, _id: { $ne: userId }, "role.name": { $ne: "Platform Admin" } }, { firstname: 1, lastname: 1 }).exec((err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
}