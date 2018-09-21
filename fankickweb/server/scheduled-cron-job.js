var cron = require('node-cron');
var ScheduledNotification = require('./models/PushNotifications/scheduledNotification');
var scheduledNotification = new ScheduledNotification();
var moment = require('moment-timezone');
var moments = require('moment');
var request = require('request');
var axios = require('axios');
var ObjectId = require('mongodb').ObjectID;
var UserFiningPromise = require('./controller/PushNotifications/ServicesForCronJob');
var MessageCenter = require('./models/contests');
var CoinsConfiguration = require('./models/fancoins');
var requestify = require('requestify');
var mongoose = require('mongoose');
var DateUtils = require('./dateutil');
var properties = require('./properties');
var props;


if (process.env.NODE_ENV == undefined) {
  props = properties.qa;
} else if (process.env.NODE_ENV != undefined) {
  var a = process.env.NODE_ENV.trim();
  props = properties[a];
}

var apiurl = props.apiUrl;
var createGroupedArray = function (arr, chunkSize) {
    var groups = [], i;
    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
}

function sendNotifi(description, title, imageUrl, notificationType, groupedArr, id, count) {
    if (groupedArr.length > 0) {
        var uid = mongoose.Types.ObjectId();
        uid = String(uid);
        var notificationReq = {
            "userIds": groupedArr[count],
            "payload": {
                "notification": {
                    "body": description,
                    "title": title,
                    "badge": "1",
                    "sound": "popcorn.m4r"
                },
                "data": {
                    "notificationId": uid,
                    "fanClubId": "",
                    "imageUrl": imageUrl,
                    "notificationDate": DateUtils.GetFormattedDate(),
                    "notificationType": notificationType,
                    "message": description,
                    "title": title,
                    "notifyType": "0"
                }
            }
        }
        requestify.post(apiurl + '/rest/userSpecificNotifications', notificationReq).then(function (response) {
            if (response.getBody()) {
                if (response.getBody().statusCode == 1) {
                    console.log("statusCode", response.getBody().statusMessage);
                    if (groupedArr.length > (count + 1)) {
                        sendNotifi(description, title, imageUrl, notificationType, groupedArr, id, count + 1);
                    }
                    ScheduledNotification.findOne({ _id: id }, function (err, data) {
                        data.status = false;
                        data.save((err) => {
                            if (err) {
                                //res.json({ status: 404, message: "Failure", data: err });
                            } else {
                                var result = data.toObject();
                                // res.json({ status: 200, message: "Success", data: result })
                            }
                        });
                    })
                } else {
                    console.log("error");
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
    }
}

function payloadForAll(schedule, description, title, imageUrl, id, notificationType) {
    var uid = mongoose.Types.ObjectId();
    uid = String(uid);
    var notificationReq = {
        "notification": {
            "body": description,
            "title": title,
            "badge": "1",
            "sound": "popcorn.m4r"
        },
        "data": {
            "notificationId": uid,
            "fanClubId": "",
            "imageUrl": imageUrl,
            "notificationDate": DateUtils.GetFormattedDate(),
            "notificationType": notificationType,
            "message": description,
            "title": title,
            "notifyType": "0"
        }
    }
    console.log("apiUl",apiurl + '/rest/sendWebPublicNotifications');
    requestify.post(apiurl + '/rest/sendWebPublicNotifications', notificationReq).then(function (response) {
        if (response.getBody()) {
            if (response.getBody().statusCode == 1) {
                console.log("statusCode", response.getBody().statusMessage);
                // if (groupedArr.length > (count + 1)) {
                //     sendNotifi(description, title, imageUrl, notificationType, groupedArr, id, count + 1);
                // }
                ScheduledNotification.findOne({ _id: id }, function (err, data) {
                    data.status = false;
                    data.save((err) => {
                        if (err) {
                            //res.json({ status: 404, message: "Failure", data: err });
                        } else {
                            var result = data.toObject();
                            // res.json({ status: 200, message: "Success", data: result })
                        }
                    });
                })
            } else {
                console.log("error");
            }
        }
    }).catch(function (error) {
        console.log(error)
    });
}

function payload(schedule, description, users, title, imageUrl, id, notificationType) {
    if (schedule === "On Date" || schedule === "Today") {
        // var groupedArr = createGroupedArray(users, 1000);
        //console.log("groupedArr", groupedArr.length)
        //var count = 0;
        //sendNotifi(description, title, imageUrl, notificationType, groupedArr, id, count);
        var uid = mongoose.Types.ObjectId();
        uid = String(uid);
        var notificationReq = {
            "userIds": users,
            "payload": {
                "notification": {
                    "body": description,
                    "title": title,
                    "badge": "1",
                    "sound": "popcorn.m4r"
                },
                "data": {
                    "notificationId": uid,
                    "fanClubId": "",
                    "imageUrl": imageUrl,
                    "notificationDate": DateUtils.GetFormattedDate(),
                    "notificationType": notificationType,
                    "message": description,
                    "title": title,
                    "notifyType": "0"
                }
            }
        }
        requestify.post(apiurl + '/rest/userSpecificNotifications', notificationReq).then(function (response) {
            if (response.getBody()) {
                if (response.getBody().statusCode == 1) {
                    console.log("statusCode", response.getBody().statusMessage);
                    // if (groupedArr.length > (count + 1)) {
                    //     sendNotifi(description, title, imageUrl, notificationType, groupedArr, id, count + 1);
                    // }
                    ScheduledNotification.findOne({ _id: id }, function (err, data) {
                        data.status = false;
                        data.save((err) => {
                            if (err) {
                                //res.json({ status: 404, message: "Failure", data: err });
                            } else {
                                var result = data.toObject();
                                // res.json({ status: 200, message: "Success", data: result })
                            }
                        });
                    })
                } else {
                    console.log("error");
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
        // axios.post(apiurl + '/rest/userSpecificNotifications', notificationReq).then((response) => {
        //     console.log("response", response)
        //     if (response.data.statusCode === 1) {
        //         //console.log("statusCode", response.data.statusMessage)
        //         ScheduledNotification.findOne({ _id: id }, function (err, data) {
        //             data.status = false;
        //             data.save((err) => {
        //                 if (err) {
        //                     //res.json({ status: 404, message: "Failure", data: err });
        //                 } else {
        //                     var result = data.toObject();
        //                     // res.json({ status: 200, message: "Success", data: result })
        //                 }
        //             });
        //         })
        //     }
        // }).catch(function (error) {
        //     console.log(error)
        // })
        // console.log("notificationReq", notificationReq)
        // console.log("apiUrl",apiurl + '/rest/userSpecificNotifications')
    } else if (schedule === "Weekly") {
        var uid = mongoose.Types.ObjectId();
        uid = String(uid);
        var notificationReq = {
            "userIds": users,
            "payload": {
                "notification": {
                    "body": description,
                    "title": title,
                    "badge": "1",
                    "sound": "popcorn.m4r"
                },
                "data": {
                    "notificationId": uid,
                    "fanClubId": "",
                    "imageUrl": imageUrl,
                    "notificationDate": DateUtils.GetFormattedDate(),
                    "notificationType": notificationType,
                    "message": description,
                    "title": title,
                    "notifyType": "0"
                }
            }
        }
        requestify.post(apiurl + '/rest/userSpecificNotifications', notificationReq).then(function (response) {
            if (response.getBody()) {
                if (response.getBody().statusCode == 1) {
                    var a = moment(data[i].scheduledDate).add(7, 'days');
                    a = a.format("YYYY-MM-DD");
                    var time = moment(data[i].scheduledDate).format("HH:mm:ss");
                    var d = a + " " + time;
                    var newDate = new Date(d).toISOString();
                    ScheduledNotification.findOne({ _id: id }, function (err, data) {
                        data.scheduledDate = newDate;
                        data.save((err) => {
                            if (err) {
                                //res.json({ status: 404, message: "Failure", data: err });
                            } else {
                                var result = data.toObject();
                                // res.json({ status: 200, message: "Success", data: result });
                            }
                        });
                    })
                } else {
                }
            }
        });
    } else if (schedule === "Monthly") {
        var uid = mongoose.Types.ObjectId();
        uid = String(uid);
        var notificationReq = {
            "userIds": users,
            "payload": {
                "notification": {
                    "body": description,
                    "title": title,
                    "badge": "1",
                    "sound": "popcorn.m4r"
                },
                "data": {
                    "notificationId": uid,
                    "fanClubId": "",
                    "imageUrl": imageUrl,
                    "notificationDate": DateUtils.GetFormattedDate(),
                    "notificationType": notificationType,
                    "message": description,
                    "title": title,
                    "notifyType": "0"
                }
            }
        }
        requestify.post(apiurl + '/rest/userSpecificNotifications', notificationReq).then(function (response) {
            if (response.getBody()) {
                if (response.getBody().statusCode == 1) {
                    var a = moment(data[i].scheduledDate).month(1).format('YYYY-MM-DD');
                    var time = moment(data[i].scheduledDate).format("HH:mm:ss");
                    var d = a + " " + time;
                    var newDate = new Date(d).toISOString();
                    ScheduledNotification.findOne({ _id: id }, function (err, data) {
                        data.scheduledDate = newDate;
                        data.save((err) => {
                            if (err) {
                                //res.json({ status: 404, message: "Failure", data: err });
                            } else {
                                var result = data.toObject();
                                // res.json({ status: 200, message: "Success", data: result });
                            }
                        });
                    })
                } else {
                }
            }
        });
    }
}

cron.schedule('*/1 * * * *', function (res) {
    var varient = 60 * 1000;
    var fromDate = moments(new Date().toISOString()).format("YYYY-MM-DD HH:mm:ss.sss");
    var toDate = moments(new Date(new Date(fromDate).getTime() + varient).toISOString()).format("YYYY-MM-DD HH:mm:ss.sss");
    // var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss.SSS');
    // console.log("fromDate", new Date(fromDate), "toDate", new Date(toDate));
    var users = [];
    ScheduledNotification.find({ scheduledDate: { $gte: fromDate, $lte: toDate }, status: true }, function (err, data) {
        if (data) {
            // console.log("data", data)
            for (var i = 0; i < data.length; i++) {
                if (data[i].category === "Challenges") {
                    if (data[i].targetActivity === "No. of Likes Received") {
                        if (data[i].within === "within") {
                            var startDate = "", endDate = "", time = "";
                            if (data[i].days != null) {
                                var dat = moment().subtract(data[i].days, 'days').calendar();
                                time = moment(dat).add(1, 'day').toISOString();
                            }
                            UserFiningPromise.challengesLikesCount(data[i].likesCount, data[i].targetUserCategory, time, data[i].range, data[i].startLikesCount, data[i].endLikesCount, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then(function (result) {
                                if (result) {
                                    users = result.list;
                                    payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                                }
                            }).catch(function (result) {
                            })
                        } else if (data[i].within === "withinRange") {
                            if (data[i].startDays != null) {
                                var dat1 = moment().subtract(data[i].startDays, 'days').calendar();
                                startDate = moment(dat1).add(1, 'day').toISOString();
                                var dat2 = moment().subtract(data[i].endDays, 'days').calendar();
                                endDate = moment(dat2).add(1, 'day').toISOString();
                            }
                            UserFiningPromise.challengesLikesCountRange(data[i].likesCount, data[i].targetUserCategory, startDate, endDate, data[i].range, data[i].startLikesCount, data[i].endLikesCount, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                                if (result) {
                                    users = result.list;
                                    payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                                }
                            }).catch(function (result) {
                            })
                        }
                    } else if (data[i].targetActivity === "No. of Participations") {
                        if (data[i].within === "within") {
                            var startDate = "", endDate = "", time = "";
                            if (data[i].days != null) {
                                var dat = moment().subtract(data[i].days, 'days').calendar();
                                time = moment(dat).add(1, 'day').toISOString();
                            }
                            UserFiningPromise.challengesParticipatedCount(data[i].range, time, data[i].likesCount, data[i].startLikesCount, data[i].endLikesCount, data[i].targetUserCategory, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then(function (result) {
                                if (result) {
                                    users = result.list;
                                    payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                                }
                            }).catch(function (result) {
                            })
                        } else if (data[i].within === "withinRange") {
                            if (data[i].startDays != null) {
                                var dat1 = moment().subtract(data[i].startDays, 'days').calendar();
                                startDate = moment(dat1).add(1, 'day').toISOString();
                                var dat2 = moment().subtract(data[i].endDays, 'days').calendar();
                                endDate = moment(dat2).add(1, 'day').toISOString();
                            }
                            UserFiningPromise.challengesParticipatedCountRange(data[i].range, startDate, endDate, data[i].likesCount, data[i].startLikesCount, data[i].endLikesCount, data[i].targetUserCategory, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                                if (result) {
                                    users = result.list;
                                    payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                                }
                            }).catch(function (result) {
                            })
                        }
                    } else if (data[i].targetActivity === "Participated") {
                        if (data[i].within === "within") {
                            var startDate = "", endDate = "", time = "";
                            if (data[i].days != null) {
                                var dat = moment().subtract(data[i].days, 'days').calendar();
                                time = moment(dat).add(1, 'day').toISOString();
                            }
                            UserFiningPromise.challengesParticipated(time, data[i].targetUserCategory).then(function (result) {
                                if (result) {
                                    users = result.list;
                                    payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                                }
                            }).catch(function (result) {
                            })
                        } else if (data[i].within === "withinRange") {
                            if (data[i].startDays != null) {
                                var dat1 = moment().subtract(data[i].startDays, 'days').calendar();
                                startDate = moment(dat1).add(1, 'day').toISOString();
                                var dat2 = moment().subtract(data[i].endDays, 'days').calendar();
                                endDate = moment(dat2).add(1, 'day').toISOString();
                            }
                            UserFiningPromise.challengesParticipatedRange(startDate, endDate, data[i].targetUserCategory, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                                if (result) {
                                    users = result.list;
                                    payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                                }
                            }).catch(function (result) {
                            })
                        }
                    }
                } else if (data[i].category === "Fan Clubs") {
                    if (data[i].targetActivity === "Join Fan Club") {
                        var startDate = "", endDate = "", time = "";
                        if (data[i].days != null) {
                            var dat = moment().subtract(data[i].days, 'days').calendar();
                            time = moment(dat).add(1, 'day').toISOString();
                        } else if (data[i].startDays != null) {
                            var dat1 = moment().subtract(data[i].startDays, 'days').calendar();
                            startDate = moment(dat1).add(1, 'day').toISOString();
                            var dat2 = moment().subtract(data[i].endDays, 'days').calendar();
                            endDate = moment(dat2).add(1, 'day').toISOString();
                        }
                        UserFiningPromise.joinedFanclub(data[i].targetUserCategoryId, data[i].targetUserSubcatId, data[i].celebrityName, time, startDate, endDate, data[i].performed, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                            if (result) {
                                //console.log("catId",data[i].targetUserCategoryId,"subCatId",data[i].targetUserSubcatId);
                                // console.log("celebrityName",data[i].celebrityName,"time",time,"startDate",startDate,"endDate",endDate,"performed",data[i].performed);
                                users = result.list;
                                //console.log("users", users);
                                payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                            }
                        }).catch(function (result) {
                        })
                    } else if (data[i].targetActivity === "No.of Fan Clubs Joined") {
                        var startDate = "", endDate = "", time = "";
                        if (data[i].days != null) {
                            var dat = moment().subtract(data[i].days, 'days').calendar();
                            time = moment(dat).add(1, 'day').toISOString();
                        } else if (data[i].startDays != null) {
                            var dat1 = moment().subtract(data[i].startDays, 'days').calendar();
                            startDate = moment(dat1).add(1, 'day').toISOString();
                            var dat2 = moment().subtract(data[i].endDays, 'days').calendar();
                            endDate = moment(dat2).add(1, 'day').toISOString();
                        }
                        UserFiningPromise.fanclubCount(data[i].range, data[i].likesCount, data[i].startLikesCount, data[i].endLikesCount, time, startDate, endDate, data[i].targetUserCategoryId, data[i].targetUserSubcatId, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                            if (result) {
                                users = result.list;
                                //console.log("users", users)
                                payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                            }
                        }).catch(function (result) {
                        })
                    } else if (data[i].targetActivity === "Fan Club Creation") {
                        var startDate = "", endDate = "", time = "";
                        if (data[i].days != null) {
                            var dat = moment().subtract(data[i].days, 'days').calendar();
                            time = moment(dat).add(1, 'day').toISOString();
                        } else if (data[i].startDays != null) {
                            var dat1 = moment().subtract(data[i].startDays, 'days').calendar();
                            startDate = moment(dat1).add(1, 'day').toISOString();
                            var dat2 = moment().subtract(data[i].endDays, 'days').calendar();
                            endDate = moment(dat2).add(1, 'day').toISOString();
                        }
                        UserFiningPromise.createFanclub(data[i].targetUserCategoryId, data[i].targetUserSubcatId, data[i].celebrityName, time, startDate, endDate, data[i].performed, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                            if (result) {
                                users = result.list;
                                payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                            }
                        }).catch(function (result) {
                        })
                    } else if (data[i].targetActivity === "No. of Fan Clubs Created") {
                        var startDate = "", endDate = "", time = "";
                        if (data[i].days != null) {
                            var dat = moment().subtract(data[i].days, 'days').calendar();
                            time = moment(dat).add(1, 'day').toISOString();
                        } else if (data[i].startDays != null) {
                            var dat1 = moment().subtract(data[i].startDays, 'days').calendar();
                            startDate = moment(dat1).add(1, 'day').toISOString();
                            var dat2 = moment().subtract(data[i].endDays, 'days').calendar();
                            endDate = moment(dat2).add(1, 'day').toISOString();
                        }
                        UserFiningPromise.createFanclubCount(data[i].targetUserCategoryId, data[i].targetUserSubcatId, data[i].likesCount, data[i].startLikesCount, data[i].endLikesCount, time, startDate, endDate, data[i].range, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                            if (result) {
                                users = result.list;
                                payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                            }
                        }).catch(function (result) {
                        })
                    } else if (data[i].targetActivity === "No. of Fan Club Members - To Admin") {
                        var startDate = "", endDate = "", time = "";
                        if (data[i].days != null) {
                            var dat = moment().subtract(data[i].days, 'days').calendar();
                            time = moment(dat).add(1, 'day').toISOString();
                        } else if (data[i].startDays != null) {
                            var dat1 = moment().subtract(data[i].startDays, 'days').calendar();
                            startDate = moment(dat1).add(1, 'day').toISOString();
                            var dat2 = moment().subtract(data[i].endDays, 'days').calendar();
                            endDate = moment(dat2).add(1, 'day').toISOString();
                        }
                        UserFiningPromise.fanclubMemberCount(data[i].targetUserCategoryId, data[i].targetUserSubcatId, data[i].likesCount, data[i].startLikesCount, data[i].endLikesCount, time, startDate, endDate, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                            if (result) {
                                users = result.list;
                                payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                            }
                        }).catch(function (result) {
                        })
                    } else if (data[i].targetActivity === "Event Creation") {
                        var startDate = "", endDate = "", time = "";
                        if (data[i].days != null) {
                            var dat = moment().subtract(data[i].days, 'days').calendar();
                            time = moment(dat).add(1, 'day').toISOString();
                        } else if (data[i].startDays != null) {
                            var dat1 = moment().subtract(data[i].startDays, 'days').calendar();
                            startDate = moment(dat1).add(1, 'day').toISOString();
                            var dat2 = moment().subtract(data[i].endDays, 'days').calendar();
                            endDate = moment(dat2).add(1, 'day').toISOString();
                        }
                        UserFiningPromise.createEvent(data[i].targetUserCategoryId, data[i].targetUserSubcatId, time, startDate, endDate, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                            if (result) {
                                users = result.list;
                                payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                            }
                        }).catch(function (result) {
                        })
                    } else if (data[i].targetActivity === "No. of Events Created") {
                        var startDate = "", endDate = "", time = "";
                        if (data[i].days != null) {
                            var dat = moment().subtract(data[i].days, 'days').calendar();
                            time = moment(dat).add(1, 'day').toISOString();
                        } else if (data[i].startDays != null) {
                            var dat1 = moment().subtract(data[i].startDays, 'days').calendar();
                            startDate = moment(dat1).add(1, 'day').toISOString();
                            var dat2 = moment().subtract(data[i].endDays, 'days').calendar();
                            endDate = moment(dat2).add(1, 'day').toISOString();
                        }
                        UserFiningPromise.createEventCount(data[i].targetUserCategoryId, data[i].targetUserSubcatId, data[i].range, time, startDate, endDate, data[i].likesCount, data[i].startLikesCount, data[i].endLikesCount, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                            if (result) {
                                users = result.list;
                                payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                            }
                        }).catch(function (result) {
                        })
                    } else if (data[i].targetActivity === "Fan Club Feeds") {
                        var startDate = "", endDate = "", time = "";
                        if (data[i].days != null) {
                            var dat = moment().subtract(data[i].days, 'days').calendar();
                            time = moment(dat).add(1, 'day').toISOString();
                        } else if (data[i].startDays != null) {
                            var dat1 = moment().subtract(data[i].startDays, 'days').calendar();
                            startDate = moment(dat1).add(1, 'day').toISOString();
                            var dat2 = moment().subtract(data[i].endDays, 'days').calendar();
                            endDate = moment(dat2).add(1, 'day').toISOString();
                        }
                        UserFiningPromise.fanclubFeed(data[i].targetUserCategoryId, data[i].targetUserSubcatId, time, startDate, endDate, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                            if (result) {
                                users = result.list;
                                payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                            }
                        }).catch(function (result) {
                        })
                    }
                } else if (data[i].category === "Miscellaneous") {
                    if (data[i].targetActivity === "Refer Friend") {
                        UserFiningPromise.referFriend(data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                            if (result) {
                                //console.log("adad", result.list)
                                users = result.list;
                                payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                            }
                        }).catch(function (result) {
                        })
                    } else if (data[i].targetActivity === "Profile Creation") {
                        UserFiningPromise.createProfile(data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                            if (result) {
                                users = result.list;
                                payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                            }
                        }).catch(function (result) {
                        })
                    } else if (data[i].targetActivity === "Add Profile Picture") {
                        UserFiningPromise.createProfilePicture(data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                            if (result) {
                                users = result.list;
                                payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                            }
                        }).catch(function (result) {
                        })
                    } else if (data[i].targetActivity === "No. of Fan Coins") {
                        UserFiningPromise.miscFancoins(data[i].likesCount, data[i].startLikesCount, data[i].endLikesCount, data[i].range, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                            if (result) {
                                users = result.list;
                                payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                            }
                        }).catch(function (result) {
                        })
                    } else if (data[i].targetActivity === "All Users") {
                        // UserFiningPromise.miscAllUsers(data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                        //     if (result) {
                        //         users = result.list;
                        // users=users.map(String);
                        payloadForAll(data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, String(data[i]._id), "13");
                        //     }
                        // })
                    }
                } else if (data[i].category === "Fun2Win") {
                    if (data[i].targetActivity === "Participated") {
                        UserFiningPromise.fun2winParticipated(data[i].targetUserCategoryId, data[i].targetUserSubcatId, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                            if (result) {
                                users = result.list;
                                payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                            }
                        }).catch(function (result) {
                        })
                    } else if (data[i].targetActivity === "No. of Participations") {
                        UserFiningPromise.fun2winParticipatedCount(data[i].targetUserCategoryId, data[i].targetUserSubcatId, data[i].range, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                            if (result) {
                                users = result.list;
                                payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                            }
                        }).catch(function (result) {
                        })
                    } else if (data[i].targetActivity === "Not Participated") {
                        UserFiningPromise.fun2winNotParticipated(data[i].targetUserCategoryId, data[i].targetUserSubcatId, data[i].schedule, data[i].description, data[i].title, data[i].imageUrl, data[i]._id).then((result) => {
                            if (result) {
                                users = result.list;
                                payload(result.reqObj.schedule, result.reqObj.description, users, result.reqObj.title, result.reqObj.imageUrl, String(result.reqObj.id), "13");
                            }
                        })
                    }
                }
            }
        }
    })
});


cron.schedule("00 00 00 * * *", function () {
    MessageCenter.find({"isDeleted":false,"isPublished":true}, function (err, data) {
        if (data) {
            var result = [];
            for (var i = 0; i < data.length; i++) {
                var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD');
                var startDate = moment.tz(data[i].contestStartDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD');
                if (today === startDate) {
                    result.push(data[i]);
                }
            }
            var count = 0;
            sendInApp(count, result);
        }
    })
})
function sendInApp(count, data) {
    if (data.length > 0) {
        var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD');
        var startDate = moment.tz(data[count].contestStartDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD');
        if (startDate === today) {
            var createdDate = moment.tz(data[count].createdDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss');
            var id = String(data[count]._id);
            var payload = {
                "buttonText": data[count].buttonText,
                "contestDescription": data[count].contestDescription,
                "contestImageUrl": data[count].contestImageUrl,
                "contestTitle": data[count].contestTitle,
                "contestStartDate": data[count].contestStartDate,
                "contestEndDate": data[count].contestEndDate,
                "inAppType": 1,
                "createdDate": createdDate,
                "contestId": id,
                "isPublished":true,
                "isDeleted":false
            }
            requestify.post(apiurl + '/rest/publicInApp', payload).then(function (response) {
                if (response.getBody()) {
                    if (response.getBody().statusCode == 1) {
                        if (data.length > (count + 1)) {
                            sendInApp(count + 1, data);
                        }
                    } else {
                    }
                }
            });
        } else {
            if (data.length > count) {
                sendInApp(count++, data)
            }
        }
    }
}

cron.schedule("00 00 00 * * *", function () {
    var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD');
    CoinsConfiguration.find({}, function (err, data) {
        for (var i = 0; i < data.length; i++) {
            var fun2winExpireDate = moment.tz(data[i].fun2win.expireDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD');
            if (fun2winExpireDate < today) {
                data[i].fun2win.like.points = 10;
                data[i].fun2win.comment.points = 10;
                data[i].fun2win.share.twitter = 10;
                data[i].fun2win.share.instagram = 10;
                data[i].fun2win.share.facebook = 10;
                //data[i].fun2win.participation.points = 10;
                data[i].save((err) => {
                    if (err) {
                    } else {
                    }
                })
            }
            var contestExpireDate = moment.tz(data[i].contests.expireDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD');
            if (contestExpireDate < today) {
                data[i].contests.like.points = 10;
                data[i].contests.comment.points = 10;
                data[i].contests.share.twitter = 10;
                data[i].contests.share.instagram = 10;
                data[i].contests.share.facebook = 10;
                data[i].contests.participation.points = 10;
                data[i].save((err) => {
                    if (err) {
                    } else {
                    }
                })
            }
            var fanclubsExpireDate = moment.tz(data[i].fanClubs.expireDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD');
            if (fanclubsExpireDate < today) {
                data[i].fanClubs.like.points = 10;
                data[i].fanClubs.comment.points = 10;
                data[i].fanClubs.share.twitter = 10;
                data[i].fanClubs.share.instagram = 10;
                data[i].fanClubs.share.facebook = 10;
                data[i].save((err) => {
                    if (err) {
                    } else {
                    }
                })
            }
            var fanActivityRefer = moment.tz(data[i].fanActivity.refer.expireDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD');
            if (fanActivityRefer < today) {
                data[i].fanActivity.refer.points = 10;
                data[i].save((err) => {
                    if (err) {
                    } else {
                    }
                })
            }
            var fanActivityCreateProfile = moment.tz(data[i].fanActivity.createProfile.expireDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD');
            if (fanActivityCreateProfile < today) {
                data[i].fanActivity.createProfile.points = 10;
                data[i].save((err) => {
                    if (err) {
                    } else {
                    }
                })
            }
            var fanActivityCreateEvent = moment.tz(data[i].fanActivity.createEvent.expireDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD');
            if (fanActivityCreateEvent < today) {
                data[i].fanActivity.createEvent.points = 10;
                data[i].save((err) => {
                    if (err) {
                    } else {
                    }
                })
            }
        }
    })
})