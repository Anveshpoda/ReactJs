var ScheduledNotification = require('../../models/PushNotifications/scheduledNotification');
var SchNotifications = require('../../models/PushNotifications/SchNotifications');
var VerifyToken = require('../../security/TokenVerification');
var moment = require('moment-timezone');
var cron = require('node-cron');
var request = require('request');

module.exports = function (app) {
    app.post('/scheduledNotification', VerifyToken, function (req, res) {
        var input = req.body;
        var scheduledNotification = new ScheduledNotification(input);
        scheduledNotification.save((err) => {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            } else {
                var result = scheduledNotification.toObject();
                result.createdDate = moment(scheduledNotification.createdDate).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: result });
            }
        })
    })
    app.get('/scheduledNotification', VerifyToken, function (req, res) {
        ScheduledNotification.find({}, function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) res.json({ status: 200, message: "Success", data: data })
        })
    })
    app.get('/scheduledNotification/:id', VerifyToken, function (req, res) {
        ScheduledNotification.findById(req.params.id, function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.delete('/scheduledNotification', VerifyToken, (req, res) => {
        var input = req.body;
        ScheduledNotification.remove({ '_id': { '$in': input } }, (err, data) => {
            if (err)
                res.send(err)
            res.json({ status: 200, message: "Success", data: 'Notification Deleted Successfully' })
        })
    })
    app.put('/scheduledNotification/:id', VerifyToken, function (req, res) {
        var input = req.body;
        ScheduledNotification.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, data) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: data });
        })
    })

    app.post('/scheduledNotificationGeneric', VerifyToken, function (req, res) {
        var input = req.body;
        var schNoti = new SchNotifications(input);
        schNoti.save((err) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            else {
                var result = schNoti.toObject();
                res.json({ status: 200, message: "Success", data: result })
            }
        })
    })
}