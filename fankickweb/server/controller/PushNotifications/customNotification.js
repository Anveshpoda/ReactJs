var CustomNotifications = require('../../models/PushNotifications/customNotification');
var VerifyToken = require('../../security/TokenVerification');
const moment = require('moment-timezone');
var requestify = require('requestify');
var mongoose = require('mongoose');
var utils = require('../../dateutil');
var properties = require('../../properties');
var props;


if (process.env.NODE_ENV == undefined) {
  props = properties.qa;
} else if (process.env.NODE_ENV != undefined) {
  var a = process.env.NODE_ENV.trim();
  props = properties[a];
}

var apiurl = props.apiUrl;

module.exports = function (app) {
    app.post('/customNotification', VerifyToken, (req, res) => {
        var input = req.body;
        var customNotification = new CustomNotifications(input);
        //if (input.category != "Fan Clubs") {
        if (input.title && input.description) {
            var id = mongoose.Types.ObjectId();
            id = String(id);
            var notificationReq = {
                "userIds": input.users,
                "payload": {
                    "notification": {
                        "body": input.description,
                        "title": input.title,
                        "badge": "1",
                        "sound": "popcorn.m4r"
                    },
                    "data": {
                        "notificationId": id,
                        "fanClubId": "",
                        "imageUrl": input.imageUrl,
                        "notificationDate": utils.GetFormattedDate(),
                        "notificationType": "13",
                        "message": input.description,
                        "title": input.title,
                        "notifyType": "0"
                    }
                }
            }
            //console.log(apiurl + '/rest/userSpecificNotifications');
            requestify.post(apiurl + '/rest/userSpecificNotifications', notificationReq).then(function (response) {
                if (response.getBody()) {
                    if (response.getBody().statusCode == 1) {
                    } else {
                    }
                }
            });
        }
        // } else {
        //     if (input.title && input.description) {
        //         var id = mongoose.Types.ObjectId();
        //         id = String(id);
        //         var notificationReq = {
        //             "userIds": input.users,
        //             "payload": {
        //                 "notification": {
        //                     "body": input.description,
        //                     "title": input.title,
        //                     "badge": "1",
        //                     "sound": "popcorn.m4r"
        //                 },
        //                 "data": {
        //                     "notificationId": id,
        //                     "fanClubId": "",
        //                     "imageUrl": input.imageUrl,
        //                     "notificationDate": utils.GetFormattedDate(),
        //                     "notificationType": "13",
        //                     "message": input.description,
        //                     "title": input.title,
        //                     "notifyType": "0"
        //                 }
        //             }
        //         }

        //         console.log(apiurl + '/rest/userSpecificNotifications');
        //         requestify.post(apiurl + '/rest/userSpecificNotifications', notificationReq).then(function (response) {
        //             if (response.getBody()) {
        //                 if (response.getBody().statusCode == 1) {
        //                 } else {
        //                 }
        //             }
        //         });
        //     }
        // }
        customNotification.save((err) => {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            } else {
                var result = customNotification.toObject();
                result.createdDate = moment(customNotification.createdDate).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: result });
            }
        })
    })

    app.get('/customNotification', VerifyToken, (req, res) => {
        CustomNotifications.find({}, (err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                res.json({ status: 200, message: "Success", data: data });
            }
        })
    })

    app.get('/customNotification/:_id', VerifyToken, (req, res) => {
        CustomNotifications.findById(req.params._id, (err, data) => {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            } else {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })

    app.put('/customNotification/:id', VerifyToken, (req, res) => {
        var input = req.body;
        CustomNotifications.findOne({ _id: req.params.id }, (err, data) => {
            data.type = input.type;
            data.category = input.category;
            data.title = input.title;
            data.description = input.description;
            data.imageURL = input.imageURL;
            data.location = input.location;
            data.createdDate = input.createdDate;
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

    app.delete('/customNotification', VerifyToken, (req, res) => {
        var input = req.body;
        CustomNotifications.remove({ '_id': { '$in': input } }, (err, data) => {
            if (err)
                res.send(err)
            res.json({ status: 200, message: "Success", data: 'Notification Deleted Successfully' })
        })
    })

}