var PredefinedNotification = require('../../models/PushNotifications/predefinedNotification');
const moment = require('moment-timezone');

module.exports = function (app) {
    app.post('/predefinedNotification', function (req, res) {
        var input = req.body;
        const predefinedNotification = new PredefinedNotification(input);
        predefinedNotification.save((err) => {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            } else {
                var result = predefinedNotification.toObject();
                result.createdDate = moment(predefinedNotification.createdDate).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: result })
            }
        })
    })
    app.get('/predefinedNotification', function (req, res) {
        PredefinedNotification.find({}, function (err, data) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err })
            } else {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.get('/predefinedNotification/:_id', function (req, res) {
        PredefinedNotification.findById(req.params._id, function (err, data) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            } else {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.put('/predefinedNotification/:id', function (req, res) {
        var input = req.body;
        PredefinedNotification.findOne({ _id: req.params.id }, { new: true }, function (err, data) {
            data.type = input.type;
            data.category = input.category;
            data.notification = input.notification;
            data.title = input.title;
            data.description = input.description;
            data.imageURL = input.imageURL;
            data.onOrOff = input.onOrOff;
            data.inApp = input.inApp;
            data.save((err) => {
                if (err) {
                    res.json({ status: 404, message: "Failure", data: err });
                } else {
                    var result = data.toObject();
                    res.json({ status: 200, message: "Success", data: result })
                }
            });

        })
    })

    app.post('/predefinedNotificationDelete', function (req, res) {
        var input = req.body;
        PredefinedNotification.remove({ '_id': { '$in': input } }, function (err, data) {
            if (err)
                res.send(err)
            res.json({ status: 200, message: 'Notification Successfully deleted' })
        })
    })
}