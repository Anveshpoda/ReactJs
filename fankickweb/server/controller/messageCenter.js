var Contests = require('../models/contests');
var Locations = require('../models/contestlocations');
var Coins = require('../models/PushNotifications/FanCoins');
const moment = require('moment-timezone');
var bcrypt = require('bcrypt-nodejs');
var VerifyToken = require('../security/TokenVerification');
var DateUtil = require('../dateutil');
var ObjectId = require('mongodb').ObjectID;
var _ = require('lodash')

module.exports = function (app) {
    app.post('/contest', VerifyToken, function (req, res) {
        var input = req.body;
        input.createdDate = DateUtil.dateInUTC();
        input.updatedDate = DateUtil.dateInUTC();
        // console.log(input.contestEndDate)
        const contests = new Contests(input);
        contests.save((saveErr) => {
            if (saveErr) {
                res.json({ status: 404, message: "Failure", data: saveErr });
            } else {
                var result = contests.toObject()
                result.contestEndDate = moment.tz(contests.contestEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                result.contestStartDate = moment.tz(contests.contestStartDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: result });
            }
        });
    });
    app.get('/locations', VerifyToken, function (req, res) {
        Locations.find({}, function (err, contest) {
            if (err) {
                return res.send({ status: 404, message: "Failure", data: err });
            } else if (contest) {
                return res.send({ status: 200, message: "Success", data: contest });
            }
        });
    });

    app.put('/contest/:contestId', VerifyToken, function (req, res) {
        var input = req.body;
        // input.createdDate = DateUtil.dateInUTC();
        input.updatedDate = DateUtil.dateInUTC();
        //  console.log(input.contestEndDate)
        Contests.findOneAndUpdate({ _id: req.params.contestId }, input, { new: true }, function (err, contest) {
            if (err)
                res.send(err);
            else if (contest) {
                var result = contest.toObject()
                result.contestEndDate = moment.tz(contest.contestEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                result.contestStartDate = moment.tz(contest.contestStartDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: result });
            } else {
                res.json({ status: 404, message: "Failure" });
            }
        });
    });

    app.get('/contest/:contestId', VerifyToken, function (req, res) {
        Contests.findById(req.params.contestId, function (err, contest) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            } else {
                if (contest) {
                    var result = contest.toObject()
                    var pArray = [];
                    for (var n = 0; n < result.feedDetails.length; n++) {
                        if (result.feedDetails[n].feedType != "wallpost") {
                            pArray.push(result.feedDetails[n]);
                        }
                    }
                    var resultArray = _.uniqBy(pArray, function (e) {
                        return String(e.userId);
                    });
                    //var resultArray = _.uniqBy(pArray, 'userId')
                    result.pCount = resultArray.length;
                    result.contestEndDate = moment.tz(contest.contestEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                    result.contestStartDate = moment.tz(contest.contestStartDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                    res.json({ status: 200, message: "Success", data: result });
                } else {
                    res.json({ status: 200, message: "Success", data: contest });
                }
            }
        });
    });
    app.get('/contest', VerifyToken, function (req, res) {
        Contests.find({}, function (err, contest) {
            if (err) {
                return res.send({ status: 404, message: "Failure", data: err });
            } else if (contest) {
                var result = [];
                var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                contest.sort(function (a, b) {
                    return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
                });
                for (var i = 0; i < contest.length; i++) {
                    var object = contest[i].toObject();
                    if (new Date(today).getTime() > new Date(contest[i].contestEndDate).getTime() || contest[i].isDeleted) {
                        object.isClosed = true;
                        object.isQueued = false;
                        object.isRunning = false;
                    } else if ((new Date(contest[i].contestEndDate).getTime() >= new Date(today).getTime() && new Date(contest[i].contestStartDate).getTime() <= new Date(today).getTime() && !contest[i].isDeleted && contest[i].isPublished)) {
                        object.isClosed = false;
                        object.isQueued = false;
                        object.isRunning = true;
                    } else if ((new Date(today).getTime() < new Date(contest[i].contestStartDate).getTime() && new Date(today).getTime() < new Date(contest[i].contestEndDate).getTime() && !contest[i].isDeleted && contest[i].isPublished) || (!contest[i].isPublished && !contest[i].isDeleted)) {
                        object.isClosed = false;
                        object.isQueued = true;
                        object.isRunning = false;
                    }
                    object.contestEndDate = moment.tz(object.contestEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                    object.contestStartDate = moment.tz(object.contestStartDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                    var pArray = [];
                    for (var n = 0; n < object.feedDetails.length; n++) {
                        if (object.feedDetails[n].feedType != "wallpost") {
                            pArray.push(String(object.feedDetails[n].userId._id))
                        }
                    }
                    var resultArray = _.uniq(pArray)
                    object.pCount = resultArray.length;
                    result.push(object);
                }
                res.json({ status: 200, message: "Success", data: result });
            } else {
                res.json({ status: 200, message: "Success", data: contest });
            }
        });
    });

    app.get('/running', VerifyToken, function (req, res) {
        Contests.find({}, function (err, contest) {
            if (err)
                res.send(err);
            var running = [];
            var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
            contest.sort(function (a, b) {
                return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
            });
            for (var i = 0; i < contest.length; i++) {
                var object = contest[i].toObject();
                object.contestEndDate = moment.tz(object.contestEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                object.contestStartDate = moment.tz(object.contestStartDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                if (new Date(contest[i].contestEndDate).getTime() >= new Date(today).getTime() && new Date(contest[i].contestStartDate).getTime() <= new Date(today).getTime() && !contest[i].isDeleted && contest[i].isPublished) {
                    object.isRunning = false; object.isQueued = false; object.isClosed = true;
                    var pArray = [];
                    for (var n = 0; n < object.feedDetails.length; n++) {
                        if (object.feedDetails[n].feedType != "wallpost") {
                            pArray.push(String(object.feedDetails[n].userId._id));
                        }
                    }
                    var resultArray = _.uniq(pArray)
                    object.pCount = resultArray.length;
                    running.push(object);
                }
            }
            res.json({ status: 200, message: "Success", data: running });
        });
    });
    app.get('/closed', VerifyToken, function (req, res) {
        Contests.find({}, function (err, contest) {
            if (err)
                res.send(err);
            var closed = [];
            var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
            var response = {};
            contest.sort(function (a, b) {
                return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
            });
            for (var i = 0; i < contest.length; i++) {
                var object = contest[i].toObject();
                object.contestEndDate = moment.tz(object.contestEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                object.contestStartDate = moment.tz(object.contestStartDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                if (new Date(today).getTime() > new Date(contest[i].contestEndDate).getTime() || contest[i].isDeleted) {
                    object.isClosed = true; object.isQueued = false; object.isRunning = false;
                    var pArray = [];
                    for (var n = 0; n < object.feedDetails.length; n++) {
                        if (object.feedDetails[n].feedType != "wallpost") {
                            pArray.push(object.feedDetails[n]);
                        }
                    }
                    var resultArray = _.uniqBy(pArray, function (e) {
                        return String(e.userId);
                    });
                    object.pCount = resultArray.length;
                    closed.push(object)
                }
            }
            res.json({ status: 200, message: "Success", data: closed });
        });
    });
    app.get('/queued', VerifyToken, function (req, res) {
        Contests.find({}, function (err, contest) {
            if (err)
                res.send(err);
            var queued = [];
            var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
            contest.sort(function (a, b) {
                return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
            });
            for (var i = 0; i < contest.length; i++) {
                var object = contest[i].toObject();
                object.contestEndDate = moment.tz(object.contestEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                object.contestStartDate = moment.tz(object.contestStartDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                if ((new Date(today).getTime() < new Date(contest[i].contestStartDate).getTime() && new Date(today).getTime() < new Date(contest[i].contestEndDate).getTime() && !contest[i].isDeleted && contest[i].isPublished) || (!contest[i].isPublished && !contest[i].isDeleted)) {
                    object.isQueued = false; object.isClosed = true; object.isRunning = false;
                    var pArray = [];
                    for (var n = 0; n < object.feedDetails.length; n++) {
                        if (object.feedDetails[n].feedType != "wallpost") {
                            pArray.push(object.feedDetails[n]);
                        }
                    }
                    var resultArray = _.uniqBy(pArray, function (e) {
                        return String(e.userId);
                    });
                    object.pCount = resultArray.length;
                    queued.push(object)
                }
            }
            res.json({ status: 200, message: "Success", data: queued });
        });
    });

    app.delete('/contest/:contestId', VerifyToken, function (req, res) {
        Contests.remove({
            _id: req.params.contestId
        }, function (err, contest) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Contest successfully deleted." });
        });
    });

    /*Message center report */
    app.post('/messageCenterReport', VerifyToken, function (req, res) {
        var input = req.body;
        var startDate = input.startDate;
        var endDate = input.endDate;
        var usersParticipatedTotal = 0;
        var contestsCreatedTotal = 0;
        var usersEarned250CoinsTotal = 0;
        Contests.aggregate([
            {
                $match: {
                    $or: [{ "createdDate": { $gte: new Date(startDate), $lte: new Date(endDate) } },
                    { "feedDetails.createdDate": { $gte: new Date(startDate), $lte: new Date(endDate) } }]
                }
            },
            { $project: { "feedDetails": 1, "createdDate": 1, _id: 0 } }
        ], function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                var dates = [];
                var startD = moment(startDate).format('YYYY-MM-DD');
                var endD = moment(endDate).format("YYYY-MM-DD");
                var currentDate = startD;
                while (currentDate <= endD) {
                    dates.push(currentDate);
                    currentDate = moment(currentDate).add(1, 'day').format('YYYY-MM-DD');
                }
                var result = [];
                for (let i of dates) {
                    var obj = {}; var contests = 0; var users = 0;
                    for (let j of data) {
                        for (let k of j.feedDetails) {
                            k.createdDate = moment(k.createdDate).format('YYYY-MM-DD');
                            if (k.createdDate === i) {
                                users = users + 1;
                            }
                        }
                        j.createdDate = moment(j.createdDate).format('YYYY-MM-DD');
                        if (j.createdDate === i) {
                            //users = users + j.users;
                            contests = contests + 1;
                        }
                    }
                    // users = users.map(String);
                    // users = _.uniq(users);
                    obj.noOfUsersParticipated = users;
                    obj.noOfContestsCreated = contests;
                    obj.date = i;
                    usersParticipatedTotal += users;
                    contestsCreatedTotal += contests;
                    // console.log("usersParticipatedTotal---->", usersParticipatedTotal);
                    // console.log("contestsCreatedTotal---->", contestsCreatedTotal);
                    result.push(obj);
                }
                Coins.aggregate([
                    { $match: { "createdDate": { $gte: new Date(startDate), $lte: new Date(endDate) }, "reasonId": ObjectId("5971abdabb7c646c2d528596") } },
                    { $lookup: { from: "CoinSource", localField: "reasonId", foreignField: "_id", as: "reason" } },
                    { $unwind: "$reason" }, { $group: { "_id": "$createdDate" } }
                ], function (err1, coinsData) {
                    if (coinsData) {
                        for (let i of result) {
                            var count = 0;
                            for (let j of coinsData) {
                                j._id = moment(j._id).format('YYYY-MM-DD');
                                if (j._id === i.date) {
                                    count = count + 1;
                                }
                            }
                            i.noOfUsersEarned250Coins = count;
                            usersEarned250CoinsTotal += count
                        }
                        // console.log("usersEarned250CoinsTotal---->", usersEarned250CoinsTotal);
                        res.json({
                            status: 200,
                            message: "Success",
                            data: result,
                            usersParticipatedTotal: usersParticipatedTotal,
                            contestsCreatedTotal: contestsCreatedTotal,
                            usersEarned250CoinsTotal: usersEarned250CoinsTotal
                        })
                    }
                })
            }
        })
    })
    /*Message center default report */
    app.get('/mcDefaultReport', VerifyToken, (req, res) => {
        Contests.find({}, function (err, data) {
            if (data) {
                var obj = {}; var count = 0;
                obj.noOfContestsPushed = data.length;
                for (let i of data) {
                    if (i.feedDetails.length != 0) {
                        count = count + i.feedDetails.length;
                    }
                }
                obj.noOfParticipantsPlayed = count;
                Coins.aggregate([
                    { $match: { "reasonId": ObjectId("5971abdabb7c646c2d528596") } },
                    { $lookup: { from: "CoinSource", localField: "reasonId", foreignField: "_id", as: "reason" } },
                    { $unwind: "$reason" }, { $group: { "_id": "$createdDate" } }
                ], function (err1, coinsData) {
                    if (coinsData) {
                        obj.noOfUsersEarned250Coins = coinsData.length;
                        res.json({ status: 200, message: "Success", data: [obj] })
                    }
                })
            }
        })
    })

    app.get('/contests/curation/contestTitle/:key/:type', VerifyToken, function (req, res) {
        var input = req.params.key;
        var query = {};
        if (req.params.type === "dashboard") query = { 'isDeleted': false, 'isPublished': true, 'feedDetails': { $elemMatch: { 'feedType': input, isDeleted: false } } };
        if (req.params.type === "junk") query = { 'isDeleted': false, 'isPublished': true, 'feedDetails': { $elemMatch: { 'feedType': input, isDeleted: true, junkFeed: true } } };
        if (req.params.type === "featured") query = { 'isDeleted': false, 'isPublished': true, 'feedDetails': { $elemMatch: { 'feedType': input, isDeleted: false, featuredPost: true } } };
        Contests.aggregate([
            {
                $match: query
                // "feedDetails.feedType": input, "feedDetails.isDeleted": false

            },
            { $project: { contestTitle: 1 } }
        ], function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })

    app.post('/contests/curation/:key/:number', VerifyToken, function (req, res) {
        var input = req.body;
        var type = input.feedType;
        var contestIds = input.contestIds;
        var query = {};
        if (req.params.key === "dashboard") query = { "feedDetails.feedType": type, "feedDetails.isDeleted": false };
        if (req.params.key === "junk") query = { "feedDetails.feedType": type, "feedDetails.isDeleted": true, "feedDetails.junkFeed": true }
        if (req.params.key === "featured") query = { "feedDetails.feedType": type, "feedDetails.isDeleted": false, "feedDetails.featuredPost": true }
        Contests.aggregate([
            { $match: { _id: { $in: contestIds.map((id) => ObjectId(id)) } } },
            { $unwind: "$feedDetails" },
            { $match: query },
            { $sort: { "feedDetails.createdDate": -1 } },
            { $addFields: { "feedDetails.contestTitle": "$contestTitle", "feedDetails.contestId": "$_id" } },
            { $lookup: { from: 'UserProfile', localField: "feedDetails.userId", foreignField: "_id", as: "feedDetails.userData" } },
            { $group: { "_id": null, "feedDetails": { $push: "$feedDetails" } } },
            {
                $project: {
                    feedDetails: {
                        $slice: ["$feedDetails", parseInt(parseInt(12 * (+req.params.number - 1))), parseInt(parseInt(12))]
                    }, feedsLength: { $size: "$feedDetails" }, _id: 0
                }
            }
        ], function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data.length != 0) {
                var noOfFeeds = 0;
                if (data[0].feedsLength != 0)
                    noOfFeeds = (data[0].feedsLength % 12 == 0) ? parseInt(data[0].feedsLength / 12) : parseInt((data[0].feedsLength / 12) + 1)
                res.json({ status: 200, message: "Success", data: data[0], noOfPages: noOfFeeds })
            } else {
                res.json({ status: 400, message: "No data found" })
            }
        })
    })
    // app.get('/contests/curation/:key/:number/:feedNumber1/:feedNumber2', VerifyToken, function (req, res) {
    //     var input = req.params.key;
    //     Contests.aggregate([
    //         //Find Document
    //         { $match: { 'isDeleted': false, 'isPublished': true } },
    //         // flatten array documents
    //         { $unwind: "$feedDetails" },
    //         // match for elements, "documents" is no longer an array
    //         { $match: { "feedDetails.feedType": input, "feedDetails.isDeleted": false } },
    //         //sorting
    //         { $sort: { "feedDetails.createdDate": -1 } },
    //         // re-create documents array
    //         { $group: { "_id": "$contestTitle", "feedDetails": { $push: "$feedDetails" } } }, { $unwind: "$feedDetails" },
    //         {
    //             $project: {
    //                 contestTitle: "$_id",
    //                 feedDetails: 1,
    //                 _id: 0
    //             }
    //         },
    //         { $lookup: { from: 'UserProfile', localField: 'feedDetails.userId', foreignField: '_id', as: 'feedDetails.userData' } },
    //         { $group: { "_id": "$contestTitle", "feedDetails": { $push: "$feedDetails" } } },
    //         {
    //             $project: {
    //                 feedDetails: 1, feedsLength: { "$size": "$feedDetails" }
    //             }
    //         },
    //         { $skip: parseInt(2 * (+req.params.number - 1)) }, { $limit: parseInt(2) }
    //     ]).exec(function (err, contestDetailsData) {
    //         for (let i of contestDetailsData) {
    //             if (contestDetailsData.indexOf(i) === 0) {
    //                 i.feedDetails = i.feedDetails.slice(parseInt(4 * (+req.params.feedNumber1 - 1)), parseInt(4 * (+req.params.feedNumber1)));
    //             } if (contestDetailsData.indexOf(i) === 1) {
    //                 i.feedDetails = i.feedDetails.slice(parseInt(4 * (+req.params.feedNumber2 - 1)), parseInt(4 * (+req.params.feedNumber2)));
    //             }
    //             i.noOfFeeds = (i.feedsLength % 4 == 0) ? parseInt(i.feedsLength / 4) : parseInt((i.feedsLength / 4) + 1)
    //         }
    //         Contests.find({ 'isDeleted': false, 'isPublished': true }).count().exec(function (err1, c) {
    //             res.json({ statusCode: 1, statusMessage: "Success", data: contestDetailsData, noOfPages: (c % 2 == 0) ? parseInt(c / 2) : parseInt((c / 2) + 1) });
    //         })
    //     })
    // });

    app.put('/mc/curation/delete/:key', VerifyToken, function (req, res) {
        var input = req.body;
        var inputKey = req.params.key;
        var criteria = {
            _id: { $in: input.ids }
        };
        if (inputKey === "mcFeed") {
            updateMcFeed(0, input.ids, res)
        } else if (inputKey === "mcFeedComment") {

        } else {
            res.json({ status: 200, message: "Please Provide Valid Keyword." });
        }
    });

    app.put('/curation/contests/addJunk/:junkPriority', VerifyToken, function (req, res) {
        // var input = req.params.id;
        var input = req.body.ids; var priority = req.params.junkPriority;
        // Contests.update({ "feedDetails._id": input }, { $set: { "feedDetails.$.junkFeed": true } }, function (err, data) {
        //     if (err) res.json({ status: 404, message: "Failure", data: err })
        //     else {
        //         res.json({ status: 200, message: "Success" })
        //     }
        // })
        updateMcFeedJunk(0, input, res, priority);
    })

    app.put('/curation/contests/addFeature/:priority', VerifyToken, function (req, res) {
        var input = req.body.ids; var priority = req.params.priority;
        updateMcFeedFeatured(0, input, res, priority);
    })

    app.post('/curation/contests/featuredType/:number/:priority', VerifyToken, (req, res) => {
        var contestIds = req.body.contestIds;
        var type = req.body.feedType;
        Contests.aggregate([
            { $match: { _id: { $in: contestIds.map((id) => ObjectId(id)) } } },
            { $unwind: "$feedDetails" },
            { $match: { "feedDetails.feedType": type, "feedDetails.isDeleted": false, "feedDetails.featuredPost": { $exists: true }, "feedDetails.priority": +req.params.priority } },
            { $sort: { "feedDetails.createdDate": -1 } },
            { $addFields: { "feedDetails.contestTitle": "$contestTitle", "feedDetails.contestId": "$_id" } },
            { $lookup: { from: 'UserProfile', localField: "feedDetails.userId", foreignField: "_id", as: "feedDetails.userData" } },
            { $group: { "_id": null, "feedDetails": { $push: "$feedDetails" } } },
            {
                $project: {
                    feedDetails: {
                        $slice: ["$feedDetails", parseInt(parseInt(12 * (+req.params.number - 1))), parseInt(parseInt(12))]
                    }, feedsLength: { $size: "$feedDetails" }, _id: 0
                }
            }
        ], function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data.length != 0) {
                var noOfFeeds = 0;
                if (data[0].feedsLength != 0)
                    noOfFeeds = (data[0].feedsLength % 12 == 0) ? parseInt(data[0].feedsLength / 12) : parseInt((data[0].feedsLength / 12) + 1)
                res.json({ status: 200, message: "Success", data: data[0], noOfPages: noOfFeeds })
            } else {
                res.json({ status: 400, message: "No data found" })
            }
        })
    })

}

function updateMcFeedFeatured(index, ids, res, priority) {
    if (ids.length > index) {
        Contests.update({ 'feedDetails._id': ids[index] }, { $set: { 'feedDetails.$.featuredPost': true, "feedDetails.$.priority": priority } }, function (err, result) {
            if (err) {
                res.json({ status: 400, message: "Failure", data: err });
            } else {
                index = +index + 1;
                if (ids.length == index)
                    res.json({ status: 200, message: "Success" });
                else
                    updateMcFeedFeatured(index, ids, res, priority)
            }
        });
    }
}

function updateMcFeedJunk(index, ids, res, priority) {
    if (ids.length > index) {
        Contests.update({ "feedDetails._id": input }, { $set: { "feedDetails.$.junkFeed": true , "feedDetails.$.junkPriority": priority } }, function (err, result) {
            if (err) {
                res.json({ status: 400, message: "Failure", data: err });
            } else {
                index = +index + 1;
                if (ids.length == index)
                    res.json({ status: 200, message: "Success" });
                else
                    updateMcFeedJunk(index, ids, res, priority)
            }
        });
    }
}

function updateMcFeed(index, ids, res) {
    if (ids.length > index) {
        Contests.update({ 'feedDetails._id': ids[index] }, { $set: { 'feedDetails.$.isDeleted': true } }, function (err, result) {
            if (err) {
                res.json({ status: 400, message: "Failure", data: err });
            } else {
                index = +index + 1;
                if (ids.length == index)
                    res.json({ status: 200, message: "Success" });
                else
                    updateMcFeed(index, ids, res)
            }
        });
    }
}