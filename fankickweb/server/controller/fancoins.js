var FanCoins = require('../models/fancoins');
var Coins = require('../models/PushNotifications/FanCoins');
var CouponsInfo = require('../models/couponsinfo');
var UserProfile = require('../models/UserProfile');
const moment = require('moment-timezone');
var ObjectId = require('mongodb').ObjectID;
var VerifyToken = require('../security/TokenVerification');
const _ = require('lodash');

module.exports = function (app) {
    app.get('/coinsinfo', VerifyToken, function (req, res) {
        FanCoins.find({}, function (err, coins) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: coins });
        });
    });

    app.get('/coins/fanclubs', VerifyToken, function (req, res) {
        FanCoins.find({}, function (err, coins) {
            if (err)
                res.send(err);
            var result = coins[0].toObject();
            result.fanClubs.expireDate = moment.tz(coins[0].fanClubs.expireDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
            res.json({ status: 200, message: "Success", data: { id: coins[0]._id, fanClubs: result.fanClubs } });
        });
    });
    app.get('/coins/contests', VerifyToken, function (req, res) {
        FanCoins.find({}, function (err, coins) {
            if (err)
                res.send(err);
            var result = coins[0].toObject();
            result.contests.expireDate = moment.tz(coins[0].contests.expireDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
            res.json({ status: 200, message: "Success", data: { id: coins[0]._id, contests: result.contests } });
        });
    });
    app.get('/coins/fun2win', VerifyToken, function (req, res) {
        FanCoins.find({}, function (err, coins) {
            if (err)
                res.send(err);
            var result = coins[0].toObject();
            result.fun2win.expireDate = moment.tz(coins[0].fun2win.expireDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
            res.json({ status: 200, message: "Success", data: { id: coins[0]._id, fun2win: result.fun2win } });
        });
    });

    app.get('/coins/fanactivity/createEvent', VerifyToken, function (req, res) {
        FanCoins.find({}, function (err, coins) {
            if (err)
                res.send(err);
            var result = coins[0].toObject();
            result.fanActivity.createEvent.expireDate = moment.tz(coins[0].fanActivity.createEvent.expireDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
            res.json({ status: 200, message: "Success", data: { id: coins[0]._id, createEvent: result.fanActivity.createEvent } });
        });
    });

    app.get('/coinsinfo/fanactivity/createProfile', VerifyToken, function (req, res) {
        FanCoins.find({}, function (err, coins) {
            if (err)
                res.send(err);
            var result = coins[0].toObject();
            result.fanActivity.createProfile.expireDate = moment.tz(coins[0].fanActivity.createProfile.expireDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
            res.json({ status: 200, message: "Success", data: { id: coins[0]._id, createProfile: result.fanActivity.createProfile } });
        });
    });

    app.get('/coinsinfo/fanactivity/refer', VerifyToken, function (req, res) {
        FanCoins.find({}, function (err, coins) {
            if (err)
                res.send(err);
            var result = coins[0].toObject();
            result.fanActivity.refer.expireDate = moment.tz(coins[0].fanActivity.refer.expireDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
            res.json({ status: 200, message: "Success", data: { id: coins[0]._id, refer: result.fanActivity.refer } });
        });
    });

    app.put('/coins/fanclubs', VerifyToken, function (req, res) {
        var input = req.body;
        FanCoins.findOne({ _id: input.id }, function (err, fanCoins) {
            fanCoins.fanClubs.share = input.fanClubs.share
            fanCoins.fanClubs.comment = input.fanClubs.comment
            fanCoins.fanClubs.like = input.fanClubs.like
            fanCoins.fanClubs.expireDate = new Date(input.fanClubs.expireDate)
            fanCoins.fanClubs.noftifyBeforeExpire = input.fanClubs.noftifyBeforeExpire
            fanCoins.save((saveErr) => {
                if (saveErr) {
                    res.json({ status: 404, message: "Failure", data: saveErr });
                } else {
                    var result = fanCoins.toObject();
                    res.json({ status: 200, message: "Success", data: result.fanClubs });
                }
            });
        })
    });
    app.put('/coins/contests', VerifyToken, function (req, res) {
        var input = req.body;
        FanCoins.findOne({ _id: input.id }, function (err, fanCoins) {
            fanCoins.contests.share = input.contests.share
            fanCoins.contests.comment = input.contests.comment
            fanCoins.contests.like = input.contests.like
            fanCoins.contests.expireDate = new Date(input.contests.expireDate)
            fanCoins.contests.noftifyBeforeExpire = input.contests.noftifyBeforeExpire
            fanCoins.save((saveErr) => {
                if (saveErr) {
                    res.json({ status: 404, message: "Failure", data: saveErr });
                } else {
                    var result = fanCoins.toObject();
                    res.json({ status: 200, message: "Success", data: result.contests });
                }
            });
        })
    });
    app.put('/coins/fun2win', VerifyToken, function (req, res) {
        var input = req.body;
        FanCoins.findOne({ _id: input.id }, function (err, fanCoins) {
            fanCoins.fun2win.share = input.fun2win.share
            fanCoins.fun2win.comment = input.fun2win.comment
            fanCoins.fun2win.like = input.fun2win.like
            fanCoins.fun2win.expireDate = new Date(input.fun2win.expireDate)
            fanCoins.fun2win.noftifyBeforeExpire = input.fun2win.noftifyBeforeExpire
            fanCoins.save((saveErr) => {
                if (saveErr) {
                    res.json({ status: 404, message: "Failure", data: saveErr });
                } else {
                    var result = fanCoins.toObject();
                    res.json({ status: 200, message: "Success", data: result.fun2win });
                }
            });
        })
    });

    app.put('/coins/fanactivity/createEvent', VerifyToken, function (req, res) {
        var input = req.body;
        FanCoins.findOne({ _id: input.id }, function (err, fanCoins) {
            fanCoins.fanActivity.createEvent = input.createEvent
            fanCoins.fanActivity.createEvent.expireDate = new Date(input.createEvent.expireDate)
            fanCoins.save((saveErr) => {
                if (saveErr) {
                    res.json({ status: 404, message: "Failure", data: saveErr });
                } else {
                    var result = fanCoins.toObject();
                    res.json({ status: 200, message: "Success", data: result.fanActivity });
                }
            });
        })
    });

    app.put('/coinsinfo/fanactivity/createProfile', VerifyToken, function (req, res) {
        var input = req.body;
        FanCoins.findOne({ _id: input.id }, function (err, fanCoins) {
            fanCoins.fanActivity.createProfile = input.createProfile
            fanCoins.fanActivity.createProfile.expireDate = new Date(input.createProfile.expireDate)
            fanCoins.save((saveErr) => {
                if (saveErr) {
                    res.json({ status: 404, message: "Failure", data: saveErr });
                } else {
                    var result = fanCoins.toObject();
                    res.json({ status: 200, message: "Success", data: result.fanActivity });
                }
            });
        })
    });

    app.put('/coinsinfo/fanactivity/refer', VerifyToken, function (req, res) {
        var input = req.body;
        FanCoins.findOne({ _id: input.id }, function (err, fanCoins) {
            fanCoins.fanActivity.refer = input.refer
            fanCoins.fanActivity.refer.expireDate = new Date(input.refer.expireDate)
            fanCoins.save((saveErr) => {
                if (saveErr) {
                    res.json({ status: 404, message: "Failure", data: saveErr });
                } else {
                    var result = fanCoins.toObject();
                    res.json({ status: 200, message: "Success", data: result.fanActivity });
                }
            });
        })
    });

    app.post('/coinsinfo', VerifyToken, function (req, res) {
        var input = req.body;
        const fanCoins = new FanCoins(input);
        fanCoins.save((saveErr) => {
            if (saveErr) {
                res.json({ status: 404, message: "Failure", data: saveErr });
            } else {
                var result = fanCoins.toObject();
                res.json({ status: 200, message: "Success", data: result });
            }
        });
    });

    app.get('/coinsinfo/:id', VerifyToken, function (req, res) {
        FanCoins.findById(req.params.id, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });

    app.put('/coinsinfo/:id', VerifyToken, function (req, res) {
        FanCoins.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, data) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: data });
        });
    });
    app.get('/resetCoinConfig', function (req, res) {
        FanCoins.find({}, function (err, data) {
            data[0].fun2win.like.points = 10;
            data[0].fun2win.comment.points = 10;
            data[0].fun2win.share.twitter = 10;
            data[0].fun2win.share.instagram = 10;
            data[0].fun2win.share.facebook = 10;
            data[0].contests.like.points = 10;
            data[0].contests.comment.points = 10;
            data[0].contests.share.twitter = 10;
            data[0].contests.share.instagram = 10;
            data[0].contests.share.facebook = 10;
            data[0].contests.participation.points = 10;
            data[0].fanClubs.like.points = 10;
            data[0].fanClubs.comment.points = 10;
            data[0].fanClubs.share.twitter = 10;
            data[0].fanClubs.share.instagram = 10;
            data[0].fanClubs.share.facebook = 10;
            data[0].fanActivity.refer.points = 10;
            data[0].fanActivity.createProfile.points = 10;
            data[0].fanActivity.createEvent.points = 10;
            data[0].save((err) => {
                if (err) {
                    res.send(err)
                } else {
                    var result = data[0].toObject();
                    res.json({ status: 200, message: "Success", data: result })
                }
            })

        })
    })

    /*Coins earned report */
    app.post('/coinsEarnedReport', VerifyToken, function (req, res) {
        var input = req.body;
        var startCoins = input.startCoins;
        var endCoins = input.endCoins;
        Coins.aggregate([
            { $group: { _id: '$userId', coins: { $push: "$coins" } } },
            { $project: { "earnedCoins": { $filter: { input: "$coins", as: "coin", cond: { $gt: ["$$coin", 0] } } }, "coins": { $sum: "$coins" } } },
            { $sort: { "coins": 1 } }, { $project: { "earnedCoins": { $sum: "$earnedCoins" }, coins: 1 } }, { $match: { "earnedCoins": { $gte: startCoins, $lte: endCoins } } },
            { $lookup: { from: 'UserProfile', localField: '_id', foreignField: '_id', as: 'user' } }, { $unwind: "$user" },
            { $project: { _id: 0, 'username': "$user.fullName", 'imageUrl': '$user.profileImage', 'currentFancoins': "$coins", "fancoinsEarned": "$earnedCoins", "userLocation": "$user.location", "mobileNumber": "$user.mobileNumber" } },
            {$sort:{"fancoinsEarned":-1}}
        ], function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
        // Promise.all([
        //     currentFancoins(startCoins, endCoins),
        //     fanCoinsEarned()
        // ]).then((result) => {
        //     res.json({ status: 200, message: "Success", data: result[0], defu: result[1] })
        // })
        // Coins.aggregate([/*{ $match: { createdDate: { $lte: new Date(input.endDate), $gte: new Date(input.startDate) } } },*/
        //     { $match: { "coins": { $gte: 0 } } },
        //     { $group: { _id: { userId: '$userId' }, coins: { $sum: { $add: ["$coins"] } } } },
        //     { $match: { "coins": { $gte: startCoins, $lte: endCoins } } },
        //     { $sort: { "coins": -1 } },
        //     // { $lookup: { from: 'UserProfile', localField: "_id.userId", foreignField: "_id", as: "user" } }, { $unwind: "$user" }
        // ], function (err, data) {
        //     if (err) res.json({ status: 404, message: "Failure", data: err })
        //     if (data) {
        //         var result = [];
        //         var users = [];
        //         // for (let i of data) {
        //         //     var obj = {};
        //         //     obj.username = i.user.fullName;
        //         //     obj.mobileNumber = i.user.mobileNumber;
        //         //     obj.userLocation = i.user.location;
        //         //     obj.imageUrl = i.user.profileImage;
        //         //     obj.currentFancoins = i.coins;
        //         //     obj.userId = i.user._id;
        //         //     result.push(obj);
        //         //     users.push(i._id.userId);
        //         // }
        //         for (var i = 0; i < data.length; i++) {
        //             users.push(data[i]._id.userId);
        //         }
        //         var obj = {};
        //         UserProfile.find({ _id: { $in: users } }, function (err1, userDetails) {
        //             if (userDetails) {
        //                 for (var i = 0; i < userDetails.length; i++) {
        //                     for (var j = 0; j < data.length; j++) {
        //                         if (String(data[j]._id.userId) === String(userDetails[i]._id)) {
        //                             obj.username = userDetails[i].fullName;
        //                             obj.mobileNumber = userDetails[i].mobileNumber;
        //                             obj.userLocation = userDetails[i].location;
        //                             obj.imageUrl = userDetails[i].profileImage;
        //                             obj.fancoinsEarned = data[j].coins;
        //                             obj.userId = userDetails[i]._id;
        //                             result.push(obj);
        //                             obj = {};
        //                         }
        //                     }
        //                 }
        //                 Coins.aggregate([
        //                     { $match: { userId: { $in: users } } },
        //                     { $group: { _id: { userId: '$userId' }, coins: { $sum: { $add: ["$coins"] } } } },
        //                     { $sort: { "coins": -1 } }], function (err, currentFancoins) {
        //                         if (currentFancoins) {
        //                             for (var i = 0; i < currentFancoins.length; i++) {
        //                                 for (var j = 0; j < result.length; j++) {
        //                                     if (String(result[j].userId) === String(currentFancoins[i]._id.userId)) {
        //                                         result[j].currentFancoins = currentFancoins[i].coins;
        //                                         delete result[j].userId;
        //                                     }
        //                                 }
        //                             }
        //                             res.json({ status: 200, message: "Success", data: result });
        //                         }
        //                     })
        //             }
        //         })
        //     }
        // })
    })


    app.get('/coinsEarnedDefaultReport', VerifyToken, function (req, res) {
        var obj = {};
        var fanCoins = [];
        var count = 0;
        var totalCoinsCount = 0;
        // CouponsInfo.distinct('fanCoins').exec(function (err, data1) {
        //     data1 = _.sortBy(data1);
        //     if (data1) {
        //         Coins.aggregate([{ $match: { "coins": { $gte: 0 } } }, { $group: { _id: { userId: '$userId' }, coins: { $sum: { $add: ["$coins"] } } } }], function (err, totalCoins) {
        //             if (totalCoins) {
        //                 var a = 0;
        //                 for (let i of data1) {
        //                     for (let j of totalCoins) {
        //                         a = a + j.coins;
        //                         if (data1.indexOf(i) != (data1.length - 1)) {
        //                             if (j.coins >= i && j.coins < data1[data1.indexOf(i) + 1]) {
        //                                 count = count + 1;
        //                             }
        //                         } else {
        //                             if (j.coins >= i) {
        //                                 count = count + 1;
        //                             }
        //                         }
        //                     }
        //                     totalCoinsCount = a;
        //                     obj[i] = count;
        //                     count = 0;
        //                     a = 0;
        //                 }
        //                 res.json({ status: 200, message: "Success", data: [obj], keys: Object.keys(obj), totalCoins: totalCoinsCount });
        //             }
        //         })
        //     }
        // })
        Coins.aggregate([{ $match: { "coins": { $gte: 0 } } }, { $group: { _id: { userId: '$userId' }, coins: { $sum: { $add: ["$coins"] } } } }], function (err, totalCoins) {
            if (totalCoins) {
                var a = 0;
                var first = 0; var second = 0; var third = 0; var fourth = 0; var fifth = 0; var sixth = 0;
                for (var i = 0; i < totalCoins.length; i++) {
                    a = a + totalCoins[i].coins;
                    if (totalCoins[i].coins >= 2500 && totalCoins[i].coins < 5000) {
                        first = first + 1;
                    }
                    if (totalCoins[i].coins >= 5000 && totalCoins[i].coins < 7500) {
                        second = second + 1;
                    }
                    if (totalCoins[i].coins >= 7500 && totalCoins[i].coins < 10000) {
                        third = third + 1;
                    }
                    if (totalCoins[i].coins >= 10000 && totalCoins[i].coins < 15000) {
                        fourth = fourth + 1;
                    }
                    if (totalCoins[i].coins >= 15000 && totalCoins[i].coins < 50000) {
                        fifth = fifth + 1;
                    }
                    if (totalCoins[i].coins >= 50000) {
                        sixth = sixth + 1;
                    }
                }
                obj.totalCoinsEarned = a;
                obj.UsersWith2500 = first;
                obj.UsersWith5000 = second;
                obj.UsersWith7500 = third;
                obj.UsersWith10000 = fourth;
                obj.UsersWith15000 = fifth;
                obj.UsersWith50000 = sixth;
                res.json({ status: 200, message: "Success", default: obj });
            }
        })
    })

    /*Coins Redeemed Report */
    app.post('/coinsRedeemedReport', VerifyToken, function (req, res) {
        var input = req.body;
        var coinsCount = input.coinsCount;
        Coins.aggregate([
            { $group: { _id: '$userId', coins: { $push: "$coins" } } },
            { $project: { "fancoinsRedeemed": { $filter: { input: "$coins", as: "coin", cond: { $lt: ["$$coin", 0] } } }, "coins": { $sum: "$coins" } } },
            { $sort: { "coins": -1 } },
            { $project: { "fancoinsRedeemed": { $abs: { $sum: "$fancoinsRedeemed" } }, coins: 1 } },
            { $match: { "fancoinsRedeemed": { $gte: coinsCount } } },
            { $lookup: { from: 'UserProfile', localField: '_id', foreignField: '_id', as: 'user' } },
            { $unwind: "$user" },
            { $project: { _id: 0, 'username': "$user.fullName", 'imageUrl': '$user.profileImage', 'currentFancoins': "$coins", "fancoinsRedeemed": 1, "userLocation": "$user.location", "mobileNumber": "$user.mobileNumber" } },
            {$sort:{"fancoinsRedeemed":-1}}
        ], function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
        // Coins.aggregate([/*{ $match: { createdDate: { $lte: new Date(input.endDate), $gte: new Date(input.startDate) } } },*/
        //     { $match: { "coins": { $lt: 0 } } },
        //     { $group: { _id: { userId: '$userId' }, coins: { $sum: { $add: ["$coins"] } } } },
        //     { $match: { "coins": { $lte: -coinsCount } } },
        //     { $sort: { "coins": -1 } },
        //     //{ $lookup: { from: 'UserProfile', localField: "_id.userId", foreignField: "_id", as: "user" } }, { $unwind: "$user" }
        // ], function (err, data) {
        //     console.log("data", data)
        //     if (err) res.json({ status: 404, message: "Failure", data: err })
        //     if (data) {
        //         var result = [];
        //         var users = [];
        //         // for (let i of data) {
        //         //     var obj = {};
        //         //     obj.username = i.user.fullName;
        //         //     obj.mobileNumber = i.user.mobileNumber;
        //         //     obj.userLocation = i.user.location;
        //         //     obj.imageUrl = i.user.profileImage;
        //         //     obj.currentFancoins = i.coins;
        //         //     obj.userId = i.user._id;
        //         //     result.push(obj);
        //         //     users.push(i._id.userId);
        //         // }
        //         var a = 0;
        //         for (var i = 0; i < data.length; i++) {
        //             users.push(data[i]._id.userId);
        //             a = a + data[i].coins;
        //         }
        //         var obj = {};
        //         UserProfile.find({ _id: { $in: users } }, function (err1, userDetails) {
        //             if (userDetails) {
        //                 for (var i = 0; i < userDetails.length; i++) {
        //                     for (var j = 0; j < data.length; j++) {
        //                         if (String(data[j]._id.userId) === String(userDetails[i]._id)) {
        //                             obj.username = userDetails[i].fullName;
        //                             obj.mobileNumber = userDetails[i].mobileNumber;
        //                             obj.userLocation = userDetails[i].location;
        //                             obj.imageUrl = userDetails[i].profileImage;
        //                             obj.fancoinsRedeemed = -data[j].coins;
        //                             obj.userId = userDetails[i]._id;
        //                             result.push(obj);
        //                             obj = {};
        //                         }
        //                     }
        //                 }
        //                 Coins.aggregate([
        //                     { $match: { userId: { $in: users } } },
        //                     { $group: { _id: { userId: '$userId' }, coins: { $sum: { $add: ["$coins"] } } } },
        //                     { $sort: { "coins": -1 } }], function (err, currentFancoins) {
        //                         if (currentFancoins) {
        //                             for (var i = 0; i < currentFancoins.length; i++) {
        //                                 for (var j = 0; j < result.length; j++) {
        //                                     if (String(result[j].userId) === String(currentFancoins[i]._id.userId)) {
        //                                         result[j].currentFancoins = currentFancoins[i].coins;
        //                                         delete result[j].userId;
        //                                     }
        //                                 }
        //                             }
        //                             res.json({ status: 200, message: "Success", data: result, totalRedeemed: (-a) })
        //                         }
        //                     })
        //             }
        //         })
        //     }
        // })
    })

    // function currentFancoins(startCoins, endCoins) {
    //     var fanCoinsPromise = new Promise((resolve, reject) => {
    //         Coins.aggregate([/*{ $match: { createdDate: { $lte: new Date(input.endDate), $gte: new Date(input.startDate) } } },*/
    //             { $group: { _id: { userId: '$userId' }, coins: { $sum: { $add: ["$coins"] } } } },
    //             { $match: { "coins": { $gte: startCoins, $lte: endCoins } } },
    //             { $sort: { "coins": -1 } }
    //             //{ $lookup: { from: 'UserProfile', localField: "_id.userId", foreignField: "_id", as: "user" } }, { $unwind: "$user" }
    //         ], function (err, data) {
    //             if (err) reject(err)
    //             if (data) {
    //                 resolve(data);
    //             }
    //         })
    //     })
    //     return fanCoinsPromise;
    // }

    // function fanCoinsEarned() {
    //     var coinsEarnedPromise = new Promise((resolve, reject) => {
    //         Coins.aggregate([
    //             { $match: { /*userId: { $in: users },*/ "coins": { $gte: 0 } } },
    //             { $group: { _id: { userId: '$userId' }, coins: { $sum: { $add: ["$coins"] } } } },
    //             { $sort: { "coins": -1 } }], function (err, fancoinsEarned) {
    //                 if (fancoinsEarned) {
    //                     resolve(fancoinsEarned);
    //                 }
    //             })
    //     })
    //     return coinsEarnedPromise;
    // }

    /*Coins Count by Engagement Feature Wise Report */
    app.post('/featureWiseCoinsCount', VerifyToken, (req, res) => {
        var input = req.body;
        var startDate = input.startDate;
        var endDate = input.endDate;
        var referralTotal = 0;
        var fun2winTotal = 0;
        var contestsTotal = 0;
        var profileTotal = 0;
        var fanclubsTotal = 0;
        Coins.aggregate([
            { $match: { createdDate: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
            { $project: { "date": { $dateToString: { format: "%Y-%m-%d", date: "$createdDate" } }, "coins": 1, "reasonId": 1 } },
            { $group: { _id: { "date": "$date", "reasonId": "$reasonId" }, coins: { $sum: { $add: ["$coins"] } } } },
            { $project: { "date": "$_id.date", "coins": 1, "reasonId": "$_id.reasonId", _id: 0 } }, { $sort: { "date": 1 } }
        ], (err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                var result = [];
                for (let i of data) {
                    var obj = {}; var contests = 0; var fanclubs = 0; var referral = 0; var fun2win = 0; var profile = 0;
                    for (let j of data) {
                        if (i.date === j.date) {
                            if (String(j.reasonId) === "59a9586e4ee78f620c60ec85") {
                                referral = j.coins;
                            } if (String(j.reasonId) === "593502db0b0cbbe593cd7241") {
                                fun2win = j.coins;
                            } if (String(j.reasonId) === "5971abcfbb7c646c2d528595" || String(j.reasonId) === "5971abdabb7c646c2d528596") {
                                contests = contests + j.coins;
                            } if (String(j.reasonId) === "5934ffb80b0cbbe593cd722a") {
                                profile = j.coins;
                            } if (String(j.reasonId) === "593500980b0cbbe593cd722c" || String(j.reasonId) === "593500d70b0cbbe593cd722d" || String(j.reasonId) === "593501630b0cbbe593cd7231" || String(j.reasonId) === "593501b80b0cbbe593cd7235" || String(j.reasonId) === "59bbad129f13aace6a374e36") {
                                fanclubs = fanclubs + j.coins;
                            }
                        }
                    }
                    obj.date = i.date;
                    obj.contests = contests;
                    obj.fanclubs = fanclubs;
                    obj.referral = referral;
                    obj.fun2win = fun2win;
                    obj.profile = profile;
                    fanclubsTotal += fanclubs;
                    profileTotal += profile;
                    contestsTotal += contests;
                    fun2winTotal += fun2win;
                    referralTotal += referral;
                    result.push(obj);
                }
                result = result.filter((result, index, self) =>
                    index === self.findIndex((t) => (
                        t.date === result.date
                    ))
                )
                // console.log("referralTotal---->", referralTotal);
                // console.log("fun2winTotal---->", fun2winTotal);
                // console.log("contestsTotal---->", contestsTotal);
                // console.log("profileTotal---->", profileTotal);
                // console.log("fanclubsTotal---->", fanclubsTotal);

                res.json({
                    status: 200,
                    message: "Success",
                    data: result,
                    referralTotal: referralTotal,
                    profileTotal: profileTotal,
                    fanclubsTotal: fanclubsTotal,
                    contestsTotal: contestsTotal,
                    fun2winTotal: fun2winTotal
                })
            }
        })
    })

    app.get('/featureWiseDefaultReport', VerifyToken, function (req, res) {
        var referral = 0; var fun2win = 0; var contests = 0; var fanclubs = 0; var profile = 0;
        var obj = {};
        // Coins.aggregate([{
        //     $lookup: {
        //         from: "CoinSource",
        //         localField: "reasonId",
        //         foreignField: "_id",
        //         as: "feature"
        //     }
        // }, { $unwind: "$feature" }
        // ], (err1, data1) => {
        //     if (err1) res.json({ status: 404, message: "Failure", data: err1 })
        //     if (data1) {
        //         for (let j of data1) {
        //             if (j.feature.reason === "For Reffering a User") {
        //                 referral = referral + j.coins;
        //             }
        //             if (j.feature.reason === "Content pack polling") {
        //                 fun2win = fun2win + j.coins;
        //             }
        //             if (j.feature.reason === "User for completing challanges in message centre" || j.feature.reason === "User for liking message centre challanges") {
        //                 contests = contests + j.coins;
        //             }
        //             if (j.feature.reason === "user profile completion") {
        //                 profile = profile + j.coins;
        //             }
        //             if (j.feature.reason === "Fan club creation" || j.feature.reason === "For every 25 members joins fanclub owner gains" || j.feature.reason === "Owner of news feed earning coins for every 100 likes " || j.feature.reason === "Event creating" || j.feature.reason === "Event Acceptance by 25 members") {
        //                 fanclubs = fanclubs + j.coins;
        //             }
        //         }
        //     }
        //     if (referral < 0) referral = 0;
        //     if (fun2win < 0) fun2win = 0;
        //     if (contests < 0) contests = 0;
        //     if (profile < 0) profile = 0;
        //     if (fanclubs < 0) fanclubs = 0;
        //     obj.referral = referral; obj.fun2win = fun2win; obj.contests = contests; obj.profile = profile; obj.fanclubs = fanclubs;
        //     res.json({ status: 200, message: "Success", data: [obj], keys: Object.keys(obj) })
        // })
        Coins.aggregate([
            { $group: { _id: "$reasonId", coins: { $sum: { $add: ["$coins"] } } } }
        ], function (err, data) {
            var obj = {}; var contests = 0; var fanclubs = 0;
            for (let i of data) {
                if (String(i._id) === "59a9586e4ee78f620c60ec85") {
                    obj.referral = i.coins;
                } if (String(i._id) === "593502db0b0cbbe593cd7241") {
                    obj.fun2win = i.coins;
                } if (String(i._id) === "5971abcfbb7c646c2d528595" || String(i._id) === "5971abdabb7c646c2d528596") {
                    contests = contests + i.coins;
                } if (String(i._id) === "5934ffb80b0cbbe593cd722a") {
                    obj.profile = i.coins;
                } if (String(i._id) === "593500980b0cbbe593cd722c" || String(i._id) === "593500d70b0cbbe593cd722d" || String(i._id) === "593501630b0cbbe593cd7231" || String(i._id) === "593501b80b0cbbe593cd7235" || String(i._id) === "59bbad129f13aace6a374e36") {
                    fanclubs = fanclubs + i.coins;
                }
            }
            obj.contests = contests;
            obj.fanclubs = fanclubs;
            res.json({ status: 200, message: "Success", data: [obj], keys: Object.keys(obj) })
        })
    })
}