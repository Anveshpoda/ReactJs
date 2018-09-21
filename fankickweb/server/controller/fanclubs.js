var spell = require('spell-checker-js');
var FanClubs = require('../models/FanClubs');
var UserProfile = require('../models/UserProfile');
var Celebrity = require('../models/PushNotifications/CelebrityNames');
var Feeds = require('../models/Feeds');
var Events = require('../models/Events');
var VerifyToken = require('../security/TokenVerification');
const moment = require('moment-timezone');
var ObjectId = require('mongodb').ObjectID
var _ = require('lodash');

module.exports = function (app) {
    // app.get('/fanclubs/:number', VerifyToken, function (req, res) {
    //     FanClubs.find({}).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort({ createdDateTime: -1 }).exec(function (err, fanclubs) {
    //         if (err)
    //             res.send(err);
    //         var grouped = _.groupBy(fanclubs, 'celebrityName');
    //         var keysArrya = Object.keys(grouped);
    //         var result = [];
    //         for (var i = 0; i < keysArrya.length; i++) {
    //             var object = grouped[keysArrya[i]];
    //             var resultObject = {
    //                 celebrityName: keysArrya[i],
    //                 fanClubsCount: object.length
    //             }
    //             var membersCount = 0;
    //             var usersImages = [];
    //             var clubImageUrls = []
    //             for (var h = 0; h < object.length; h++) {
    //                 if (object[h].imageUrl != "" && clubImageUrls.length < 3)
    //                     clubImageUrls.push(object[h].imageUrl);
    //             }
    //             resultObject.clubImageUrls = clubImageUrls;
    //             for (var k = 0; k < object.length; k++) {
    //               //  membersCount = +membersCount + +object[k].users.length;
    //                 resultObject.imageUrl = object[k].imageUrl;
    //                 for (var n = 0; n < object[k].users.length; n++) {
    //                     if (object[k].users[n].userId) {
    //                         if (usersImages.length < 3 && object[k].users[n].userId.profileImage != "")
    //                             usersImages.push(object[k].users[n].userId.profileImage);
    //                             if (object.users[m].status == 2) {
    //                                 membersCount = +membersCount + +1;
    //                             }
    //                     }
    //                 }
    //                 if (k < 1) {
    //                     var object = {
    //                         categoryId: object[k].catSubCategories[0]._id._id,
    //                         categoryName: object[k].catSubCategories[0]._id.name
    //                     }
    //                     resultObject.category = object;
    //                 }
    //             }

    //             resultObject.membersCount = membersCount;
    //             resultObject.usersImages = usersImages;
    //             result.push(resultObject)
    //         }
    //         FanClubs.count({}, function (err, c) {
    //             res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
    //         });
    //     });
    // });
    app.get('/fanclubsByCeleb/:celebrityName', VerifyToken, function (req, res) {
        FanClubs.find({ celebrityName: req.params.celebrityName, isDeleted: false }, function (err, fanclubs) {
            if (err)
                res.send(err);
            var result = [];
            for (var i = 0; i < fanclubs.length; i++) {
                var object = fanclubs[i];
                var resultObject = {
                    celebrityName: object.celebrityName
                }
                var membersCount = 0;
                for (var m = 0; m <= object.users.length; m++) {
                    if (object.users[m]) {
                        if (object.users[m].status == 2) {
                            membersCount = +membersCount + +1;
                        }
                    }
                }
                resultObject.membersCount = membersCount;
                resultObject.imageUrl = object.imageUrl;
                resultObject.createdBy = object.userId.fullName;
                resultObject.datetime = object.createdDate;
                resultObject.fanclubId = object._id;
                resultObject.fanclubName = object.name;
                resultObject.publicOrPrivate = object.publicOrPrivate
                var object = {
                    categoryId: object.catSubCategories[0]._id._id,
                    categoryName: object.catSubCategories[0]._id.name
                }
                resultObject.category = object;
                result.push(resultObject)
            }

            res.json({ status: 200, message: "Success", data: result });
        });
    });

    app.get('/fanclubs/category/:categoryId/:number', VerifyToken, function (req, res) {
        Celebrity.find({ "categoryId": ObjectId(req.params.categoryId) }).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).exec(function (err, celebs) {
            if (err) {
                res.send(err);
            } else {
                FanClubs.find({ isDeleted: false }).exec(function (err, data) {
                    if (err) {
                        res.send({ status: 400, message: "Failure", data: err });
                    } else {
                        var grouped = _.groupBy(data, 'celebrityName');
                        var keysArrya = Object.keys(grouped);
                        var result = [];
                        for (var m = 0; m < celebs.length; m++) {
                            var object = {};
                            object.celebrityName = celebs[m].celebrityName;
                            object.categoryName = celebs[m].categoryName;
                            object.celebrityImageUrl = celebs[m].celebrityImageUrl;
                            if (grouped[celebs[m].celebrityName]) {
                                object.fanClubsCount = grouped[celebs[m].celebrityName].length;
                                var objectArray = grouped[celebs[m].celebrityName];
                                var membersCount = 0;
                                var usersImages = [];
                                var clubImageUrls = []
                                for (var h = 0; h < objectArray.length; h++) {
                                    if (objectArray[h].imageUrl != "" && clubImageUrls.length < 3)
                                        clubImageUrls.push(objectArray[h].imageUrl);
                                }
                                object.clubImageUrls = clubImageUrls;
                                for (var k = 0; k < objectArray.length; k++) {
                                    //  membersCount = +membersCount + +objectArray[k].users.length;
                                    object.imageUrl = objectArray[k].imageUrl;
                                    for (var n = 0; n < objectArray[k].users.length; n++) {
                                        if (objectArray[k].users[n].userId) {
                                            if (usersImages.length < 3 && objectArray[k].users[n].userId.profileImage != "")
                                                usersImages.push(objectArray[k].users[n].userId.profileImage);
                                            if (objectArray[k].users[n].status == 2) {
                                                membersCount = +membersCount + +1;
                                            }
                                        }
                                    }
                                    if (k < 1) {
                                        var objectData = {
                                            categoryId: objectArray[k].catSubCategories[0]._id._id,
                                            categoryName: objectArray[k].catSubCategories[0]._id.name
                                        }
                                        object.category = objectData;
                                    }
                                }
                                object.membersCount = membersCount;
                                object.usersImages = usersImages;
                            } else {
                                object.fanClubsCount = 0;
                            }
                            result.push(object);
                        }
                        Celebrity.count({ "categoryId": ObjectId(req.params.categoryId) }, function (err, c) {
                            res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
                        });
                    }
                });
            }
        });
    });

    // app.get('/fanclubs/catsubcat/:categoryId/:subcatId', VerifyToken, function (req, res) {
    //     FanClubs.find({
    //         $and: [{ 'catSubCategories._id': ObjectId(req.params.categoryId) },
    //         { "catSubCategories.subCategories": ObjectId(req.params.subcatId) }
    //         ]
    //     }, function (err, fanclubs) {
    //         if (err)
    //             res.send(err);
    //         var grouped = _.groupBy(fanclubs, 'celebrityName');
    //         var keysArrya = Object.keys(grouped);
    //         var result = [];
    //         for (var i = 0; i < keysArrya.length; i++) {
    //             var object = grouped[keysArrya[i]];
    //             var resultObject = {
    //                 celebrityName: keysArrya[i],
    //                 fanClubsCount: object.length
    //             }
    //             var membersCount = 0;
    //             var usersImages = [];
    //             var clubImageUrls = []
    //             for (var h = 0; h < object.length; h++) {
    //                 if (object[h].imageUrl != "" && clubImageUrls.length < 3)
    //                     clubImageUrls.push(object[h].imageUrl);
    //             }
    //             resultObject.clubImageUrls = clubImageUrls;
    //             for (var k = 0; k < object.length; k++) {
    //                // membersCount = +membersCount + +object[k].users.length;
    //                 resultObject.imageUrl = object[k].imageUrl;
    //                 for (var n = 0; n < object[k].users.length; n++) {
    //                     if (object[k].users[n].userId) {
    //                         if (usersImages.length < 3 && object[k].users[n].userId.profileImage != "")
    //                             usersImages.push(object[k].users[n].userId.profileImage);
    //                             if (objectArray[k].users[n].status == 2) {
    //                                 membersCount = +membersCount + +1;
    //                             }
    //                     }
    //                 }
    //                 if (k < 1) {
    //                     var object = {
    //                         categoryId: object[k].catSubCategories[0]._id._id,
    //                         categoryName: object[k].catSubCategories[0]._id.name
    //                     }
    //                     resultObject.category = object;
    //                 }
    //             }
    //             resultObject.membersCount = membersCount;
    //             resultObject.usersImages = usersImages;
    //             result.push(resultObject)
    //         }
    //         res.json({ status: 200, message: "Success", data: result });
    //     });
    // });

    app.get('/fanclubs/catsubcatceleb/:categoryId/:celebrityName/:number', VerifyToken, function (req, res) {
        Celebrity.find({
            $and: [{ 'categoryId': ObjectId(req.params.categoryId) },
            //  { "catSubCategories.subCategories": ObjectId(req.params.subcatId) },
            { "celebrityName": req.params.celebrityName }
            ]
        }).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).exec(function (err, celebs) {
            if (err) {
                res.send(err);
            } else {
                FanClubs.find({ isDeleted: false }).exec(function (err, data) {
                    if (err) {
                        res.send({ status: 400, message: "Failure", data: err });
                    } else {
                        var grouped = _.groupBy(data, 'celebrityName');
                        var keysArrya = Object.keys(grouped);
                        var result = [];
                        for (var m = 0; m < celebs.length; m++) {
                            var object = {};
                            object.celebrityName = celebs[m].celebrityName;
                            object.categoryName = celebs[m].categoryName;
                            object.celebrityImageUrl = celebs[m].celebrityImageUrl;
                            if (grouped[celebs[m].celebrityName]) {
                                object.fanClubsCount = grouped[celebs[m].celebrityName].length;
                                var objectArray = grouped[celebs[m].celebrityName];
                                var membersCount = 0;
                                var usersImages = [];
                                var clubImageUrls = []
                                for (var h = 0; h < objectArray.length; h++) {
                                    if (objectArray[h].imageUrl != "" && clubImageUrls.length < 3)
                                        clubImageUrls.push(objectArray[h].imageUrl);
                                }
                                object.clubImageUrls = clubImageUrls;
                                for (var k = 0; k < objectArray.length; k++) {
                                    //  membersCount = +membersCount + +objectArray[k].users.length;
                                    object.imageUrl = objectArray[k].imageUrl;
                                    for (var n = 0; n < objectArray[k].users.length; n++) {
                                        if (objectArray[k].users[n].userId) {
                                            if (usersImages.length < 3 && objectArray[k].users[n].userId.profileImage != "")
                                                usersImages.push(objectArray[k].users[n].userId.profileImage);
                                            if (objectArray[k].users[n].status == 2) {
                                                membersCount = +membersCount + +1;
                                            }
                                        }
                                    }
                                    if (k < 1) {
                                        var objectData = {
                                            categoryId: objectArray[k].catSubCategories[0]._id._id,
                                            categoryName: objectArray[k].catSubCategories[0]._id.name
                                        }
                                        object.category = objectData;
                                    }
                                }

                                object.membersCount = membersCount;
                                object.usersImages = usersImages;
                            } else {
                                object.fanClubsCount = 0;
                            }
                            result.push(object);
                        }
                        Celebrity.count({
                            $and: [{ 'categoryId': ObjectId(req.params.categoryId) },
                            //  { "catSubCategories.subCategories": ObjectId(req.params.subcatId) },
                            { "celebrityName": req.params.celebrityName }
                            ]
                        }, function (err, c) {
                            res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
                        });
                    }
                });
            }
        });
    });

    app.get('/info/:fanclubId', VerifyToken, function (req, res) {
        FanClubs.find({ _id: ObjectId(req.params.fanclubId) }, function (err, fanclubs) {
            if (err)
                res.send(err);
            var result = [];
            for (var i = 0; i < fanclubs.length; i++) {
                var object = fanclubs[i];
                var resultObject = {
                    celebrityName: object.celebrityName,
                    // membersCount: object.users.length
                }
                var membersCount = 0;
                for (var m = 0; m <= object.users.length; m++) {
                    if (object.users[m]) {
                        if (object.users[m].status == 2) {
                            membersCount = +membersCount + +1;
                        }
                    }
                }
                resultObject.membersCount = membersCount;
                resultObject.imageUrl = object.imageUrl;
                resultObject.createdBy = object.userId.fullName;
                resultObject.userImageUrl = object.userId.profileImage;
                resultObject.datetime = object.createdDate;
                resultObject.fanclubId = object._id;
                resultObject.fanclubName = object.name;
                resultObject.publicOrPrivate = object.publicOrPrivate
                resultObject.locationName = object.locationName;
                resultObject.description = object.description;
                var object = {
                    categoryId: object.catSubCategories[0]._id._id,
                    categoryName: object.catSubCategories[0]._id.name
                }
                resultObject.category = object;
                result.push(resultObject)
            }
            res.json({ status: 200, message: "Success", data: result });
        });
    });

    app.get('/feeds/:fanclubId', VerifyToken, function (req, res) {
        Feeds.find({ fanClubId: req.params.fanclubId }, function (err, data) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: data });
        });
    });

    app.get('/members/:fanclubId', VerifyToken, function (req, res) {
        FanClubs.find({ _id: ObjectId(req.params.fanclubId) }, function (err, fanclubs) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: fanclubs[0] });
        });
    });

    app.get('/events/:fanclubId', VerifyToken, function (req, res) {
        Events.find({ fanClubId: req.params.fanclubId }, function (err, data) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: data });
        });
    });

    app.get('/mobile/users', VerifyToken, function (req, res) {
        UserProfile.find({ location: req.query.location }, { fullName: 1, mobileNumber: 1 }, function (err, data) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: data });
        });
    });
    app.get('/fanclubById/:fanclubId', VerifyToken, function (req, res) {
        FanClubs.find({ _id: ObjectId(req.params.fanclubId) }, function (err, fanclubs) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: fanclubs[0] });
        });
    });

    /*Fanclub report between dates */
    app.post('/fanclubReport', VerifyToken, (req, res) => {
        var input = req.body;
        var startDate = input.startDate;
        var endDate = input.endDate;
        var createdNumberSum = 0;
        var invitesNumberSum = 0;
        var joinedNumberSum = 0;
        FanClubs.aggregate([
            { $unwind: "$users" },
            {
                $match: {
                    "users.createdDate": { $gte: new Date(startDate), $lte: new Date(endDate) },
                    "users.status": { $eq: 2 }
                }
            },
            { $project: { "date": { $dateToString: { format: "%Y-%m-%d", date: "$users.createdDate" } } } },
            { $group: { _id: "$date", count: { $sum: 1 } } }, { $sort: { "_id": -1 } }
        ], function (err, data) {
            FanClubs.aggregate([
                { $match: { "createdDate": { $gte: new Date(startDate), $lte: new Date(endDate) } } },
                { $project: { "date": { $dateToString: { format: "%Y-%m-%d", date: "$createdDate" } } } },
                { $group: { _id: "$date", count: { $sum: 1 } } }, { $sort: { "_id": -1 } }
            ], function (err1, data1) {
                FanClubs.aggregate([
                    { $unwind: "$users" },
                    {
                        $match: {
                            "users.createdDate": { $gte: new Date(startDate), $lte: new Date(endDate) },
                            "users.status": { $eq: 1 }
                        }
                    },
                    { $project: { "date": { $dateToString: { format: "%Y-%m-%d", date: "$users.createdDate" } } } },
                    { $group: { _id: "$date", count: { $sum: 1 } } }, { $sort: { "_id": -1 } }
                ], function (err2, data2) {
                    if (data2 || data || data1) {
                        var result = [];
                        for (let i of data) {
                            var obj = {};
                            for (let j of data1) {
                                if (i._id === j._id) {
                                    obj.createdNumber = j.count;
                                    createdNumberSum += j.count;
                                }
                            }
                            for (let k of data2) {
                                if (i._id === k._id) {
                                    obj.invitesNumber = k.count;
                                    invitesNumberSum += k.count;
                                }
                            }
                            obj.joinedNumber = i.count;
                            joinedNumberSum += i.count;
                            obj.date = i._id;
                            result.push(obj);
                        }
                        // console.log("createdNumberSum-----", createdNumberSum);
                        // console.log("invitesNumberSum-----", invitesNumberSum);
                        // console.log("joinedNumberSum-----", joinedNumberSum);
                        res.json({
                            status: 200,
                            message: "Success",
                            data: result,
                            fanclubCreatedtotal: createdNumberSum,
                            fanclubinvitestotal: invitesNumberSum,
                            fanclubjoinedtotal: joinedNumberSum,
                        })
                    }
                })
            })
        })
        // FanClubs.aggregate([
        //     {
        //         $match: {
        //             $or: [{ "createdDate": { $gte: new Date(startDate), $lte: new Date(endDate) } },
        //             { "users.createdDate": { $gte: new Date(startDate), $lte: new Date(endDate) } }]
        //         }
        //     }
        // ], (err, data) => {
        //     if (data) {
        //         var dates = [];
        //         startDate = moment(startDate).format('YYYY-MM-DD');
        //         endDate = moment(endDate).format("YYYY-MM-DD");
        //         var currentDate = startDate;
        //         while (currentDate <= endDate) {
        //             dates.push(currentDate);
        //             currentDate = moment(currentDate).add(1, 'day').format('YYYY-MM-DD');
        //         }
        //         var obj = {};
        //         var joined = 0; var created = 0; var invites = 0;
        //         var result = [];
        //         for (let i of dates) {
        //             for (let j of data) {
        //                 if (j.users.length != 0) {
        //                     for (let k of j.users) {
        //                         k.createdDate = moment(k.createdDate).format('YYYY-MM-DD');
        //                         if (k.createdDate === i && k.status === 2) {
        //                             joined = joined + 1;
        //                         }
        //                         if (k.createdDate === i && k.status === 1) {
        //                             invites = invites + 1;
        //                         }
        //                     }
        //                 }
        //                 j.createdDate = moment(j.createdDate).format('YYYY-MM-DD');
        //                 if (j.createdDate === i) {
        //                     created = created + 1;
        //                 }
        //             }
        //             obj.date = i;
        //             obj.joinedNumber = joined;
        //             obj.createdNumber = created;
        //             obj.invitesNumber = invites;
        //             result.push(obj);
        //             obj = {};
        //             joined = 0; created = 0; invites = 0;
        //         }

        //     }
        // })
    })

    function totalFanclubs() {
        var fanclubPromise = new Promise((resolve, reject) => {
            FanClubs.aggregate([
                { $group: { _id: null, fanclubs: { $push: "$$ROOT" } } }, { $project: { "totalFanclubsCreated": { $size: "$fanclubs" }, fanclubs: 1, _id: 0 } },
                { $unwind: "$fanclubs" },
                { $project: { fanclubs: 1, totalFanclubsCreated: 1, "users": { $filter: { input: "$fanclubs.users", as: "user", cond: { $eq: ["$$user.status", 2] } } } } },
                { $project: { fanlcubs: 1, totalFanclubsCreated: 1, "users": { $size: "$users" } } },
                { $group: { _id: "$totalFanclubsCreated", users: { $sum: "$users" } } }
            ], function (err, data) {
                if (err) reject(err)
                if (data) resolve(data);
            })
        })
        return fanclubPromise;
    }
    function noofFanclubs() {
        var fanclubPromise = new Promise((resolve, reject) => {
            FanClubs.aggregate([
                { $group: { _id: null, fanclubs: { $push: "$$ROOT" } } },
                { $unwind: "$fanclubs" },
                { $project: { _id: "$fanclubs._id", "users": { $filter: { input: "$fanclubs.users", as: "user", cond: { $eq: ["$$user.status", 2] } } } } },
                { $project: { "users": { $size: "$users" } } },
                {
                    $group: {
                        _id: null, "100": { $sum: { $cond: [{ $lt: ["$users", 100] }, 1, 0] } }, "50": { $sum: { $cond: [{ $lt: ["$users", 50] }, 1, 0] } },
                        "500": { $sum: { $cond: [{ $lt: ["$users", 500] }, 1, 0] } }, "1000": { $sum: { $cond: [{ $gt: ["$users", 1000] }, 1, 0] } },
                        "3000": { $sum: { $cond: [{ $gt: ["$users", 3000] }, 1, 0] } }, "5000": { $sum: { $cond: [{ $gt: ["$users", 5000] }, 1, 0] } },
                    }
                }
            ], function (err, data) {
                if (err) reject(err)
                if (data) resolve(data);
            })
        })
        return fanclubPromise;
    }
    function topFanclub() {
        var fanclubPromise = new Promise((resolve, reject) => {
            FanClubs.aggregate([
                {
                    $lookup: {
                        from: "FanClubFeed",
                        localField: "_id",
                        foreignField: "fanClubId",
                        as: "feature"
                    }
                },
                { $project: { feature: 1, _id: 0, name: 1, len: { $size: '$feature' } } },
                { $sort: { len: -1 } },
                { $limit: 5 }, { $project: { name: 1 } }
            ], function (err, data) {
                if (err) reject(err)
                if (data) {
                    var someArr = [];
                    for (let i of data) {
                        someArr.push(i.name);
                    }
                    resolve(someArr);
                }
            })
        })
        return fanclubPromise;
    }

    app.get('/fanclubDefaultReport', VerifyToken, function (req, res) {
        Promise.all([
            totalFanclubs(),
            noofFanclubs(),
            topFanclub()
        ]).then((result) => {
            var obj = {};
            obj.totalFanclubsCreated = result[0][0]._id;
            obj.totalJoinedNumber = result[0][0].users;
            obj.FanclubCountAbove1000 = result[1][0][1000];
            obj.FanclubCountAbove3000 = result[1][0][3000];
            obj.FanclubCountAbove5000 = result[1][0][5000];
            obj.FanclubLessThan500 = result[1][0][500];
            obj.FanclubLessThan100 = result[1][0][100];
            obj.FanclubLessThan50 = result[1][0][50];
            obj.top5Fanclubs = result[2];
            res.json({ status: 200, message: "Success", default: [obj] })
        })
        // FanClubs.aggregate([
        //     { $unwind: "$users" },
        //     { $match: { "users.status": { $eq: 2 } } }, { $group: { _id: "$_id", users: { $push: "$users" } } },
        //     { $project: { _id: 0, userCount: { $size: "$users" } } }
        // ], function (err, data) {
        //     if (err) res.json({ status: 404, message: "Failure", data: err });
        //     if (data) {
        //         var obj = {};
        //         var FanclubCountAbove1000 = 0; var FanclubCountAbove3000 = 0; var FanclubCountAbove5000 = 0;
        //         var FanclubLessThan500 = 0; var FanclubLessThan100 = 0; var FanclubLessThan50 = 0;
        //         obj.totalFanclubsCreated = data.length;
        //         for (let i of data) {
        //             if (i.userCount >= 1000) {
        //                 FanclubCountAbove1000 = FanclubCountAbove1000 + 1;
        //             } else if (i.userCount >= 3000) {
        //                 FanclubCountAbove3000 = FanclubCountAbove3000 + 1;
        //             } else if (i.userCount >= 5000) {
        //                 FanclubCountAbove5000 = FanclubCountAbove5000 + 1;
        //             } else if (i.userCount < 500 && i.userCount >= 100) {
        //                 FanclubLessThan500 = FanclubLessThan500 + 1;
        //             } else if (i.userCount < 100 && i.userCount >= 50) {
        //                 FanclubLessThan100 = FanclubLessThan100 + 1;
        //             } else if (i.userCount < 50) {
        //                 FanclubLessThan50 = FanclubLessThan50 + 1;
        //             }
        //         }
        //         FanClubs.aggregate([
        //             { $unwind: "$users" },
        //             { $match: { "users.status": { $eq: 2 } } }
        //         ], function (err1, data1) {
        //             obj.totalJoinedNumber = data1.length;
        //             obj.FanclubCountAbove1000 = FanclubCountAbove1000;
        //             obj.FanclubCountAbove3000 = FanclubCountAbove3000;
        //             obj.FanclubCountAbove5000 = FanclubCountAbove5000;
        //             obj.FanclubLessThan500 = FanclubLessThan500;
        //             obj.FanclubLessThan100 = FanclubLessThan100;
        //             obj.FanclubLessThan50 = FanclubLessThan50;
        //             FanClubs.aggregate([
        //                 {
        //                     $lookup: {
        //                         from: "FanClubFeed",
        //                         localField: "_id",
        //                         foreignField: "fanClubId",
        //                         as: "feature"
        //                     }
        //                 },
        //                 { $project: { feature: 1, _id: 0, name: 1, len: { $size: '$feature' } } },
        //                 { $sort: { len: -1 } },
        //                 { $limit: 5 }, { $project: { name: 1 } }
        //             ], function (err2, topFanclubs) {
        //                 if (topFanclubs) {
        //                     var someArr = [];
        //                     for (let i of topFanclubs) {
        //                         someArr.push(i.name);
        //                     }
        //                     obj.top5Fanclubs = someArr;
        //                     res.json({ status: 200, message: "Success", default: [obj] })
        //                 }
        //             })
        //         })
        //     }
        // })

        // FanClubs.find({}, function (err1, data1) {
        //     if (err1) res.json({ status: 404, message: "Failure", data: err1 });
        //     if (data1) {
        //         var obj = {};
        //         var users = 0; var FanclubCountAbove1000 = 0; var FanclubCountAbove3000 = 0; var FanclubCountAbove5000 = 0;
        //         var FanclubLessThan500 = 0; var FanclubLessThan100 = 0; var FanclubLessThan50 = 0; var top5 = [];
        //         obj.totalFanclubsCreated = data1.length;
        //         for (let i of data1) {
        //             if (i.users.length >= 1000) {
        //                 FanclubCountAbove1000 = FanclubCountAbove1000 + 1;
        //             } else if (i.users.length >= 3000) {
        //                 FanclubCountAbove3000 = FanclubCountAbove3000 + 1;
        //             } else if (i.users.length >= 5000) {
        //                 FanclubCountAbove5000 = FanclubCountAbove5000 + 1;
        //             } else if (i.users.length < 500 && i.users.length >= 100) {
        //                 FanclubLessThan500 = FanclubLessThan500 + 1;
        //             } else if (i.users.length < 100 && i.users.length >= 50) {
        //                 FanclubLessThan100 = FanclubLessThan100 + 1;
        //             } else if (i.users.length < 50) {
        //                 FanclubLessThan50 = FanclubLessThan50 + 1;
        //             }
        //             if (i.users.length != 0) {
        //                 for (let j of i.users) {
        //                     if (j.status === 2) {
        //                         users = users + 1;
        //                     }
        //                 }
        //             }
        //         }
        //         FanClubs.aggregate([
        //             {
        //                 $lookup: {
        //                     from: "FanClubFeed",
        //                     localField: "_id",
        //                     foreignField: "fanClubId",
        //                     as: "feature"
        //                 }
        //             },
        //             { $project: { feature: 1, _id: 0, name: 1, len: { $size: '$feature' } } },
        //             { $sort: { len: -1 } },
        //             { $limit: 5 }, { $project: { name: 1 } }
        //         ], function (err2, topFanclubs) {
        //             if (topFanclubs) {
        //                 var someArr = [];
        //                 for (let i of topFanclubs) {
        //                     someArr.push(i.name);
        //                 }
        //                 obj.top5Fanclubs = someArr;
        //                 obj.totalJoinedNumber = users;
        //                 obj.FanclubCountAbove1000 = FanclubCountAbove1000;
        //                 obj.FanclubCountAbove3000 = FanclubCountAbove3000;
        //                 obj.FanclubCountAbove5000 = FanclubCountAbove5000;
        //                 obj.FanclubLessThan500 = FanclubLessThan500;
        //                 obj.FanclubLessThan100 = FanclubLessThan100;
        //                 obj.FanclubLessThan50 = FanclubLessThan50;
        //                 res.json({ status: 200, message: "Success", default: [obj] });
        //             }
        //         })
        //     }
        // })
    })

    app.get('/feedsDate', VerifyToken, function (req, res) {
        Feeds.find({}, function (err, data) {
            var ids = [];
            // Load dictionary
            spell.load('en');
            if (err) {
                res.send(err);
            } else {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].type === 'text') {
                        const check = spell.check(data[i].description);
                        if (check.length > 0) {
                            ids.push(String(data[i]._id));
                        }
                    }
                }

            }
            res.json({ status: 200, message: "Success", data: ids });
        });
    });

    app.get('/fclubs/:number', VerifyToken, function (req, res) {
        Celebrity.find({}).select('celebrityName categoryName celebrityImageUrl -_id').skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).exec(function (err, celebs) {
            if (err) {
                res.send({ status: 400, message: "Failure", data: err });
            } else {
                FanClubs.find({ isDeleted: false }).exec(function (err, data) {
                    if (err) {
                        res.send({ status: 400, message: "Failure", data: err });
                    } else {
                        var grouped = _.groupBy(data, 'celebrityName');
                        // console.log("grouped",grouped)
                        var keysArrya = Object.keys(grouped);
                        var result = [];
                        for (var m = 0; m < celebs.length; m++) {
                            var object = {};
                            object.celebrityName = celebs[m].celebrityName;
                            object.categoryName = celebs[m].categoryName;
                            object.celebrityImageUrl = celebs[m].celebrityImageUrl;
                            if (grouped[celebs[m].celebrityName]) {
                                object.fanClubsCount = grouped[celebs[m].celebrityName].length;
                                var objectArray = grouped[celebs[m].celebrityName];
                                var membersCount = 0;
                                var usersImages = [];
                                var clubImageUrls = []
                                for (var h = 0; h < objectArray.length; h++) {
                                    if (objectArray[h].imageUrl != "" && clubImageUrls.length < 3)
                                        clubImageUrls.push(objectArray[h].imageUrl);
                                }
                                object.clubImageUrls = clubImageUrls;
                                for (var k = 0; k < objectArray.length; k++) {
                                    //  membersCount = +membersCount + +objectArray[k].users.length;
                                    object.imageUrl = objectArray[k].imageUrl;
                                    for (var n = 0; n < objectArray[k].users.length; n++) {
                                        if (objectArray[k].users[n].userId) {
                                            if (usersImages.length < 3 && objectArray[k].users[n].userId.profileImage != "")
                                                usersImages.push(objectArray[k].users[n].userId.profileImage);
                                            if (objectArray[k].users[n].status == 2) {
                                                membersCount = +membersCount + +1;
                                            }
                                        }
                                    }
                                    if (k < 1) {
                                        var objectData = {
                                            categoryId: objectArray[k].catSubCategories[0]._id._id,
                                            categoryName: objectArray[k].catSubCategories[0]._id.name
                                        }
                                        object.category = objectData;
                                    }
                                }
                                object.membersCount = membersCount;
                                object.usersImages = usersImages;
                            } else {
                                object.fanClubsCount = 0;
                            }
                            result.push(object);
                        }
                        Celebrity.count({}, function (err, c) {
                            res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
                        });
                    }
                });
            }
        });
    });

    app.get('/fanclubs/feed/curation/:key/:type/:number', VerifyToken, function (req, res) {
        var input = req.params.key;
        var type = req.params.type;
        var query = {};
        if (type === "dashboard") query = { type: input, isDeleted: false };
        if (type === "junk") query = { type: input, isDeleted: true, junkFeed: true };
        if (type === "featured") query = { type: input, isDeleted: false, featuredPost: true };
        Feeds.find(query, {}, { autopopulate: false }).select({ comments: 0, likes: 0 }).
            sort({ createdDateTime: -1 }).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).exec(function (err, data) {
                if (err) {
                    res.json({ statusCode: 0, statusMessage: "Error", data: err });
                } else {
                    Feeds.count(query, function (err, c) {
                        res.json({ status: 200, message: "Success", data: data, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
                    });
                }
            });
    });


    app.put('/fanclubs/curation/delete/:key', VerifyToken, function (req, res) {
        var input = req.body;
        var inputKey = req.params.key;
        var criteria;
        if (inputKey === "fcFeed") {
            criteria = {
                _id: { $in: input.ids }
            };
            Feeds.update(criteria, { isDeleted: true }, { multi: true }, function (err, result) {
                if (err) {
                    res.json({ status: 400, message: "Failure", data: err });
                } else {
                    res.json({ status: 200, message: "Success", data: result });
                }
            });
        } else if (inputKey === "fcFeedComment") {
            updateFeedComment(0, input.ids, res)
        } else {
            res.json({ status: 200, message: "Please Provide Valid Keyword." });
        }
    });


    app.get('/fanclubs/comments/curation/:key/:number', VerifyToken, function (req, res) {
        var type = req.params.key;
        var query = {};
        if (type === "dashboard") query = { "comments.isDeleted": false };
        if (type === "junk") query = { "comments.isDeleted": true, "comments.junkComment": true };
        if (type === "featured") query = { "comments.isDeleted": false, "comments.featuredComment": true };
        //**checking if the contestId exists or not*******/
        Feeds.aggregate([
            //Find Document
            { $match: { 'isDeleted': false } },

            // flatten array documennts
            { $unwind: "$comments" },
            // match for elements, "documents" is no longer an array
            { $match: query },
            //sorting
            { $sort: { "comments.createdDateTime": -1 } },
            // re-create documents array
            { $group: { "_id": null, "comments": { $push: "$comments" } } },
            //Limit Offset
            {
                $project: {
                    _id: 0,
                    comments: "$comments",
                    comments: {
                        $slice: ["$comments", parseInt(parseInt(12 * (+req.params.number - 1))), parseInt(parseInt(12))]
                    },
                    noOfPages: { "$size": "$comments" }
                }
            }
        ]).exec(function (err, data) {
            if (err) {
                res.json({ statusCode: 0, statusMessage: "Error", data: err });
            } else {
                res.json({
                    status: 200, message: "Success", data: {
                        comments: data[0].comments, noOfPages: data[0].noOfPages % 12 == 0
                            ? parseInt(data[0].noOfPages / 12) : parseInt((data[0].noOfPages / 12) + 1)
                    }
                });
            }
        })
    });

    app.get('/fanclubs/feeds/curation/addJunk/:id', VerifyToken, function (req, res) {
        Feeds.update({ "_id": req.params.id }, { $set: { "junkFeed": true } }, function (err, data) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            } else {
                res.json({ status: 200, message: "Success" })
            }
        })
    })

    app.get('/fanclubs/feeds/curation/addFeature/:id', VerifyToken, function (req, res) {
        Feeds.update({ "_id": req.params.id }, { $set: { "featuredPost": true } }, function (err, data) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            } else {
                res.json({ status: 200, message: "Success" })
            }
        })
    })

    app.get('/fanclubs/feeds/comments/curation/addJunk/:id', VerifyToken, function (req, res) {
        Feeds.update({ "comments._id": req.params.id }, { $set: { "comments.$.junkComment": true } }, function (err, data) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            } else {
                res.json({ status: 200, message: "Success" })
            }
        })
    })

    app.get('/fanclubs/feeds/comments/curation/addFeature/:id', VerifyToken, function (req, res) {
        Feeds.update({ "comments._id": req.params.id }, { $set: { "comments.$.featuredComment": true } }, function (err, data) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            } else {
                res.json({ status: 200, message: "Success" })
            }
        })
    })

    app.get('/fanClubs/curation/:key/:number', VerifyToken, function (req, res) {
        var currentDate = new Date();
        var pastDate = new Date(currentDate.setDate(currentDate.getDate() - 90));
        if (req.params.key === "noMembers") {
            FanClubs.aggregate([
                {
                    $match: {
                        'isDeleted': false,
                        'users': {
                            $not: {
                                $elemMatch: {
                                    'createdDate': {
                                        $gte: pastDate, $lte: new Date()
                                    }, status: 2
                                }
                            }
                        }
                    }
                },
                {
                    $project: {
                        "name": 1, "celebrityName": 1, 'createdDate': 1, 'users': {
                            $filter: {
                                input: "$users", as: "user", cond: { $eq: ["$$user.status", 2] }
                            }
                        }, 'userId': { $arrayElemAt: ['$users.userId', 0] }
                    }
                },
                { $lookup: { from: 'UserProfile', localField: 'userId', foreignField: '_id', as: 'userData' } },
                {
                    $project: {
                        'createdDate': 1, 'celebrityName': 1, 'name': 1, 'userCount': { $size: '$users' },
                        'creatorName': { $arrayElemAt: ['$userData.fullName', 0] }, 'lastMemberDate': { $arrayElemAt: ['$users.createdDate', -1] }
                    }
                },
                { $group: { _id: null, records: { $push: "$$ROOT" } } },
                {
                    $project: {
                        recordsSize: { $size: "$records" }, _id: 0,
                        records: { $slice: ["$records", parseInt(parseInt(12 * (+req.params.number - 1))), parseInt(parseInt(12))] }
                    }
                }
                // { $skip: parseInt(parseInt(12 * (+req.params.number - 1))) }, { $limit: parseInt(parseInt(12)) }
            ], function (err, data) {
                if (err) res.json({ status: 404, message: "Failure", data: err })
                if (data.length != 0) {
                    var c = (data[0].recordsSize % 12 == 0) ? parseInt(data[0].recordsSize / 12) : parseInt((data[0].recordsSize / 12) + 1)
                    res.json({ status: 200, message: "Success", data: data[0].records, noOfPages: c })
                }else{
                    res.json({ status: 200, message: "No fanclubs found"})
                }
            })
        }
        else if (req.params.key === "noFeeds") {
            Feeds.aggregate([
                { $group: { _id: "$fanClubId", 'createdDateTime': { $push: "$createdDateTime" } } },
                {
                    $match: {
                        'createdDateTime': {
                            $not:
                            { $gte: pastDate, $lte: new Date() }
                        }
                    }
                },
                { $lookup: { from: 'FanClubs', localField: '_id', foreignField: '_id', as: 'fanClub' } },
                { $unwind: '$fanClub' },
                { $match: { 'fanClub.isDeleted': false } },
                {
                    $project: {
                        "name": "$fanClub.name", "celebrityName": "$fanClub.celebrityName", "createdDate": "$fanClub.createdDate", 'users': {
                            $filter: {
                                input: "$fanClub.users", as: "user", cond: { $eq: ["$$user.status", 2] }
                            }
                        }, 'lastFeedDate': { $arrayElemAt: ['$createdDateTime', -1] }
                    }
                },
                { $lookup: { from: 'UserProfile', localField: 'users.0.userId', foreignField: '_id', as: 'userData' } },
                { $project: { "name": 1, celebrityName: 1, createdDate: 1, lastFeedDate: 1, userCount: { $size: '$users' }, creatorName: { $arrayElemAt: ['$userData.fullName', 0] } } },
                { $group: { _id: null, records: { $push: "$$ROOT" } } },
                {
                    $project: {
                        recordsSize: { $size: "$records" }, _id: 0,
                        records: { $slice: ["$records", parseInt(parseInt(12 * (+req.params.number - 1))), parseInt(parseInt(12))] }
                    }
                }
            ], function (err, data) {
                if (err) res.json({ status: 404, message: "Failure", data: err })
                if (data) {
                    var c = (data[0].recordsSize % 12 == 0) ? parseInt(data[0].recordsSize / 12) : parseInt((data[0].recordsSize / 12) + 1)
                    res.json({ status: 200, message: "Success", data: data[0].records, noOfPages: c })
                }
            })
        } else if (req.params.key === "noMembersFeeds") {
            FanClubs.aggregate([
                {
                    $match: {
                        'isDeleted': false,
                        'users': {
                            $not: {
                                $elemMatch: {
                                    'createdDate': {
                                        $gte: pastDate, $lte: new Date()
                                    }, status: 2
                                }
                            }
                        }
                    }
                },
                {
                    $project: {
                        "name": 1, "celebrityName": 1, 'createdDate': 1, 'users': {
                            $filter: {
                                input: "$users", as: "user", cond: { $eq: ["$$user.status", 2] }
                            }
                        }, 'userId': { $arrayElemAt: ['$users.userId', 0] }
                    }
                },
                { $lookup: { from: 'UserProfile', localField: 'userId', foreignField: '_id', as: 'userData' } },
                {
                    $project: {
                        'createdDate': 1, 'celebrityName': 1, 'name': 1, 'userCount': { $size: '$users' },
                        'creatorName': { $arrayElemAt: ['$userData.fullName', 0] }, 'lastMemberDate': { $arrayElemAt: ['$users.createdDate', -1] }
                    }
                },
                { $group: { _id: null, records: { $push: "$$ROOT" } } },
                // { $skip: parseInt(parseInt(12 * (+req.params.number - 1))) }, { $limit: parseInt(parseInt(12)) }
            ], function (err, data) {
                if (err) res.json({ status: 404, message: "Failure", data: err })
                if (data.length!=0) {
                    var ids = []; var obj = {}; var d = [];
                    for (let i of data[0].records) {
                        obj = { fanclubId: i._id, lastMemberDate: i.lastMemberDate }
                        d.push(obj);
                        ids.push(i._id)
                    }
                    Feeds.aggregate([{ $match: { 'fanClubId': { $in: ids } } },
                    { $group: { _id: "$fanClubId", 'createdDateTime': { $push: "$createdDateTime" } } },
                    {
                        $match: {
                            'createdDateTime': {
                                $not:
                                { $gte: pastDate, $lte: new Date() }
                            }
                        }
                    },
                    { $lookup: { from: 'FanClubs', localField: '_id', foreignField: '_id', as: 'fanClub' } },
                    { $unwind: '$fanClub' },
                    { $match: { 'fanClub.isDeleted': false } },
                    {
                        $project: {
                            "name": "$fanClub.name", "celebrityName": "$fanClub.celebrityName", "createdDate": "$fanClub.createdDate", 'users': {
                                $filter: {
                                    input: "$fanClub.users", as: "user", cond: { $eq: ["$$user.status", 2] }
                                }
                            }, 'lastFeedDate': { $arrayElemAt: ['$createdDateTime', -1] }
                        }
                    },
                    { $lookup: { from: 'UserProfile', localField: 'users.0.userId', foreignField: '_id', as: 'userData' } },
                    { $project: { "name": 1, celebrityName: 1, createdDate: 1, lastFeedDate: 1, userCount: { $size: '$users' }, creatorName: { $arrayElemAt: ['$userData.fullName', 0] } } },
                    { $group: { _id: null, records: { $push: "$$ROOT" } } },
                    {
                        $project: {
                            recordsSize: { $size: "$records" }, _id: 0, records: 1
                            //         records: { $slice: ["$records", parseInt(parseInt(12 * (+req.params.number - 1))), parseInt(parseInt(12))] }
                        }
                    }
                    ], function (err, data1) {
                        if (data1) {
                            //console.log("sdf",d)
                            for (let i of d) {
                                for (let j of data1[0].records) {
                                    if (String(i.fanclubId) === String(j._id)) {
                                        j.lastMemberDate = i.lastMemberDate;
                                    }
                                }
                            }
                            data1[0].records = data1[0].records.slice(parseInt(12 * (+req.params.number - 1)), parseInt(12 * (+req.params.number)));
                            var c = (data1[0].recordsSize % 12 == 0) ? parseInt(data1[0].recordsSize / 12) : parseInt((data1[0].recordsSize / 12) + 1);
                            res.json({ status: 200, message: "Success", data: data1[0].records, noOfPages: c })
                        }
                    })
                }else{
                    res.json({ status: 200, message: "No feeds found"})
                }
            })
        }
    })

    app.get('/curation/junkFan/:id', VerifyToken, function (req, res) {
        var input = req.params.id;
        FanClubs.update({ "_id": input }, { $set: { "isDeleted": true } }, function (err, data) {
            if (err)
                res.json({ status: 404, message: "Failure", data: err })
            else {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })

    app.get('/fanclubCuration', VerifyToken, (req, res) => {
        Feeds.updateMany({ type: "text", $where: "this.description.length <= 2" }, { $set: { "isDeleted": true } }, (err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            else {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })

    app.get('/AdminFanClubsDeletion', VerifyToken, (req, res) => {
        var currentDate = new Date();
        var pastDate = new Date(currentDate.setDate(currentDate.getDate() - 60));
        FanClubs.aggregate([
            { $match: { createdDate: { $lte: pastDate } } },
            { $project: { users: { $size: { $filter: { input: "$users", as: "user", cond: { $eq: ["$$user.status", 2] } } } }, isDeleted: 1 } },
            { $match: { users: { $lte: 1 } } }
        ], (err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                for (let i of data) {
                    // console.log("i", i)
                    if (i.isDeleted === false) {
                        FanClubs.findOne({ _id: i._id }, (err1, data1) => {
                            data1.isDeleted = true;
                            data1.save((err) => {

                            })
                        })
                    }
                }
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })

    app.get('/addVirtualUsers', VerifyToken, (req, res) => {
        // UserProfile.find({ isVirtual: true }, (err, data) => {
        //     if (err) res.json({ status: 404, message: "Failure", data: err })
        //     if (data) {
        FanClubs.find({ isDeleted: false }, {}, { autopopulate: false }).exec((err1, data1) => {
            if (err1) res.json({ status: 404, message: "Failure", data: err1 })
            if (data1) {
                for (let i of data1) {
                    // var result = [];
                    UserProfile.aggregate([
                        { $match: { isVirtual: true } },
                        { $sample: { size: 10 } }
                    ], (err, data) => {
                        console.log("data", data)
                        for (let j of data) {
                            var obj = {};
                            obj.userId = j._id; obj.mobileNumber = j.mobileNumber; obj.status = 2; obj.isActive = 1;
                            obj.type = "user";
                            obj.createdDate = new Date();
                            obj.updatedDate = new Date();
                            i.users.push(obj);
                            // result.push(obj);
                        }
                        // i.users = i.users.concat(result);
                        // console.log(i.users);
                        i.save((err) => {

                        })
                    })
                }
                res.json({ status: 200, message: "Success", data: data1 })
            }
        })

        // }
        // })
    })
}

function updateFeedComment(index, ids, res) {
    if (ids.length > index) {
        Feeds.update({ 'comments._id': ids[index] }, { $set: { 'comments.$.isDeleted': true } }, function (err, result) {
            if (err) {
                res.json({ status: 400, message: "Failure", data: err });
            } else {
                index = +index + 1;
                if (ids.length == index)
                    res.json({ status: 200, message: "Success" });
                else
                    updateFeedComment(index, ids, res)
            }
        });
    }
}