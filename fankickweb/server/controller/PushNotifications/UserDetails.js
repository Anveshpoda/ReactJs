var UserDetails = require('../../models/UserProfile');
var VerifyToken = require('../../security/TokenVerification');
const moment = require('moment-timezone');
var ObjectId = require('mongodb').ObjectID;
var unique = require('array-unique');
var _ = require('lodash');
var Fancoins = require('../../models/PushNotifications/FanCoins');
var UserFining = require('./ServicesForCronJob');

module.exports = function (app) {
    app.get('/notifications/referFriend', VerifyToken, function (req, res) {
        var users = [];
        UserDetails.distinct("referrelCode").exec(function (err, data) {
            data = data.filter(v => v != '');
            UserDetails.find({ referenceCode: { $nin: data, $ne: "" } }, function (err1, records) {
                for (let i of records) {
                    users.push(i._id);
                }
                res.json({ status: 200, message: "Success", data: users })
            })
        })
    })
    app.get('/notifications/createProfile', VerifyToken, function (req, res) {
        var users = [];
        UserDetails.find({}, function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].location === "" || data[i].fullName === "" || data[i].categories.length === 0) {
                        users.push(data[i]._id);
                    }
                }
                users = unique(users);
                res.json({ status: 200, message: "Success", data: users });
            }
        })
    })
    app.get('/notifications/createProfilePic', VerifyToken, function (req, res) {
        var users = [];
        UserDetails.find({}, function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].profileImage === "") {
                        users.push(data[i]._id);
                    }
                }
                res.json({ status: 200, message: "Success", data: users });
            }
        })
    })
    app.get('/notifications/userSpecific', VerifyToken, function (req, res) {
        var users = [];
        UserDetails.aggregate([{ $project: { 'fullName': 1 } }], function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.get('/notifications/generic', VerifyToken, function (req, res) {
        // UserDetails.aggregate([{ $group: { _id: null, userIds: { $push: "$_id" } } }], function (err, data) {
        //     if (err) res.json({ status: 404, message: "Failure", data: err })
        //     if (data) {
        //         res.json({ status: 200, message: "Success", data: data[0].userIds })
        //     }
        // })
        UserFining.miscAllUsers().then((result) => {
            if (result) {
                var users = result.list;
                // var createGroupedArray = function (arr, chunkSize) {
                //     var groups = [], i;
                //     for (i = 0; i < arr.length; i += chunkSize) {
                //         groups.push(arr.slice(i, i + chunkSize));
                //     }
                //     return groups;
                // }
                // var groupedArr = createGroupedArray(users, 100);
                res.json({ status: 200, message: "Success", data: users })
            }
        })
    })

    app.get('/virtualUsers', VerifyToken, (req, res) => {
        UserDetails.find({ isVirtual: true }, (err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })

    app.post('/notifications/fancoins', VerifyToken, function (req, res) {
        var input = req.body;
        var users = [];
        var count = input.count;
        var startCount = input.startCount;
        var endCount = input.endCount;
        var compare = input.range;
        Fancoins.aggregate([
            { $group: { _id: { userId: '$userId' }, coins: { $sum: { $add: ["$coins"] } } } }
        ], function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if (compare === "Is equal to") {
                        if (data[i].coins === count) {
                            users.push(data[i]._id.userId);
                        }
                    }
                    if (compare === "Is less than") {
                        if (data[i].coins < count) {
                            users.push(data[i]._id.userId);
                        }
                    }
                    if (compare === "Is greater than") {
                        if (data[i].coins > count) {
                            users.push(data[i]._id.userId);
                        }
                    }
                    if (compare === "withinRange") {
                        if (data[i].coins >= startCount && data[i].coins <= endCount) {
                            users.push(data[i]._id.userId);
                        }
                    }
                }
                res.json({ status: 200, message: "Success", data: users });
            }
        })
    })



    /*No. of Login/Referral/Profile Report*/
    app.post('/noOfLoginReport', VerifyToken, (req, res) => {
        var input = req.body;
        var startDate = input.startDate;
        var endDate = input.endDate;
        var createdProfileTotal = 0;
        var newLoginUsersTotal = 0;
        UserDetails.aggregate([
            {
                $match: {
                    "createdDateTime": { $gte: new Date(startDate), $lte: new Date(endDate) }
                }
            }, { $project: { "date": { $dateToString: { format: "%Y-%m-%d", date: "$createdDateTime" } }, _id: 0 } },
            { $group: { _id: "$date", count: { $sum: 1 } } }, { $sort: { "_id": -1 } }
        ], function (err, data) {
            UserDetails.aggregate([
                {
                    $match: {
                        "modifiedDateTime": { $gte: new Date(startDate), $lte: new Date(endDate) },
                        "fullName": { $ne: "" }
                    }
                }, { $project: { "date": { $dateToString: { format: "%Y-%m-%d", date: "$modifiedDateTime" } }, _id: 0 } },
                { $group: { _id: "$date", count: { $sum: 1 } } }, { $sort: { "_id": -1 } }
            ], function (err1, data1) {
                var result = [];
                for (let i of data) {
                    var obj = {};
                    for (let j of data1) {
                        if (i._id === j._id) {
                            obj.usersCreatedProfile = j.count;
                            createdProfileTotal += j.count
                        }
                    }
                    obj.date = i._id;
                    obj.totalNewLoginUsers = i.count;
                    newLoginUsersTotal += i.count
                    result.push(obj);
                }
                // console.log("createdProfileTotal----->", createdProfileTotal);
                // console.log("newLoginUsersTotal----->", newLoginUsersTotal);
                res.json({
                    status: 200,
                    message: "Success",
                    data: result,
                    createdProfileTotal: createdProfileTotal,
                    newLoginUsersTotal: newLoginUsersTotal
                })
            })
        })
        // UserDetails.aggregate([
        //     {
        //         $match: {
        //             $or: [{ "createdDateTime": { $gte: new Date(startDate), $lte: new Date(endDate) } },
        //             { "modifiedDateTime": { $gte: new Date(startDate), $lte: new Date(endDate) } }]
        //         }
        //     }
        //     // }, {
        //     //     $project: {
        //     //         "createdDate": { $dateToString: { format: "%Y-%m-%d", date: "$createdDateTime" } },
        //     //         "modifiedDate": { $dateToString: { format: "%Y-%m-%d", date: "$modifiedDateTime" } }, fullName: 1, _id: 0
        //     //     }
        //     // }
        // ], (err, data) => {
        //     if (data) {
        // var result = [];
        // for (let i of data) {
        //     var obj = {}; var login = 0; var profile = 0;
        //     for (let j of data) {
        //         if (i.createdDate === j.createdDate) {
        //             login = login + 1;
        //         }
        //         if (i.modifiedDate === j.modifiedDate && j.fullName != "") {
        //             profile = profile + 1;
        //         }
        //     }
        //     obj.date = i.createdDate;
        //     obj.totalNewLoginUsers = login;
        //     obj.usersCreatedProfile = profile;
        //     result.push(obj);
        // }
        // res.json({ status: 200, message: "Success", data: result })
        //         var dates = []; var result = [];
        //         startDate = moment(startDate).format('YYYY-MM-DD');
        //         endDate = moment(endDate).format("YYYY-MM-DD");
        //         var currentDate = startDate;
        //         while (currentDate <= endDate) {
        //             dates.push(currentDate);
        //             currentDate = moment(currentDate).add(1, 'day').format('YYYY-MM-DD');
        //         }
        //         var obj = {};
        //         var login = 0; var profile = 0; var users = [];
        //         for (let i of dates) {
        //             for (let j of data) {
        //                 j.createdDateTime = moment(j.createdDateTime).format('YYYY-MM-DD');
        //                 j.modifiedDateTime = moment(j.modifiedDateTime).format('YYYY-MM-DD');
        //                 if (j.createdDateTime === i) {
        //                     login = login + 1;
        //                 }
        //                 if (j.modifiedDateTime === i && j.fullName != "") {
        //                     profile = profile + 1;
        //                 }
        //             }
        //             obj.date = i;
        //             obj.totalNewLoginUsers = login;
        //             obj.usersCreatedProfile = profile;
        //             result.push(obj);
        //             obj = {};
        //             login = 0; profile = 0;
        //         }
        //         res.json({ status: 200, message: "Success", data: result })
        //     }
        // })
    })

    app.get('/noOfLoginDefaultReport', VerifyToken, function (req, res) {
        var login = 0; var profile = 0; var users = []; var obj = {};
        // UserDetails.find({}, function (err1, data1) {
        //     if (data1) {
        //         for (let i of data1) {
        //             if (i.fullName === "") {
        //                 login = login + 1;
        //             } else if (i.fullName != "") {
        //                 profile = profile + 1;
        //             }
        //             for (let j of data1) {
        //                 if (i.referenceCode === j.referrelCode) {
        //                     users.push(i._id);
        //                 }
        //             }
        //         }
        //         users = users.map(String);
        //         users = _.uniq(users);
        //         obj.totalLoginUsers = login;
        //         obj.totalProfilesCreated = profile;
        //         obj.totalReferrals = users.length;
        //         res.json({ status: 200, message: "Success", default: [obj] })
        //     }
        // })
        var obj = {};
        UserDetails.aggregate([
            { $match: { "fullName": { $ne: "" } } }, { $group: { _id: null, "totalProfile": { $sum: 1 } } }
        ], function (err, data) {
            UserDetails.aggregate([
                { $match: { "fullName": { $eq: "" } } }, { $group: { _id: null, "totalLogin": { $sum: 1 } } }
            ], function (err, data1) {
                UserDetails.distinct("referrelCode").exec(function (err1, data2) {
                    data2 = data2.filter(v => v != '');
                    UserDetails.find({ referenceCode: { $in: data2, $ne: "" } }).count().exec(function (err1, records) {
                        obj.totalLoginUsers = data1[0].totalLogin;
                        obj.totalProfilesCreated = data[0].totalProfile;
                        obj.totalReferrals = records;
                        res.json({ status: 200, message: "Success", default: [obj] })
                    })
                })
            })
        })
    })
}