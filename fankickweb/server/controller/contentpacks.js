// var Contentpacks = require('../models/contentpacks');
var ContentPack = require('../models/contentpackmodel');
var Categories = require('../models/categories');
const moment = require('moment-timezone');
var VerifyToken = require('../security/TokenVerification');
var utils = require('../dateutil');
var ObjectId = require('mongodb').ObjectID;
var _ = require('lodash');
var userProperties = require('../models/userProperties')

module.exports = function (app) {
    app.post('/pack', VerifyToken, function (req, res) {
        var input = req.body;
        input.createdDateTime = utils.dateInUTC();
        input.modifiedDateTime = utils.dateInUTC();
        const contentpacks = new Contentpacks(input);
        contentpacks.save((saveErr) => {
            if (saveErr) {
                res.json({ status: 404, message: "Failure", data: saveErr });
            } else {
                var result = contentpacks.toObject()
                result.createdDateTime = moment(contentpacks.createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.modifiedDateTime = moment(contentpacks.modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: result });
            }
        });
    });

    app.put('/pack/:packId', VerifyToken, function (req, res) {
        Contentpacks.findOneAndUpdate({ _id: req.params.packId }, req.body, { new: true }, function (err, data) {
            if (err)
                res.send(err);
            var result = data.toObject()
            result.createdDateTime = moment(data.createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
            result.modifiedDateTime = moment(data.modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
            res.json({ status: 200, message: "Success", data: result });
        });
    });

    app.get('/pack/:packId', VerifyToken, function (req, res) {
        Contentpacks.findById(req.params.packId, function (err, data) {
            if (err) {

                res.send(err);
            } else if (data) {
                var object = data.toObject();
                object.commentsCount = data.comments.length;
                delete object.comments;
                var likesCount = 0;
                var playedCount = 0;
                var viewsCount = 0;
                for (var k = 0; k < object.userActions.length; k++) {
                    if (object.userActions[k].isViewed === 1)
                        viewsCount = +viewsCount + 1
                    if (object.userActions[k].isLiked === 1)
                        likesCount = +likesCount + 1
                    if (object.userActions[k].isAnswered === 1)
                        playedCount = +playedCount + 1
                }
                object.commentsCount = data.comments.length;
                object.likesCount = likesCount;
                object.viewsCount = viewsCount;
                object.playedCount = playedCount;
                delete object.userActions;
                object.createdDateTime = moment(data.createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                object.modifiedDateTime = moment(data.modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: object });
            } else {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });

    app.get('/all/:number/:id', VerifyToken, function (req, res) {
        var query;
        if (req.params.id === "notFreelancer") {
            query = {};
        } else if (req.params.id !== "notFreelancer") {
            query = { createdBy: req.params.id };
        }
        Contentpacks.find(query).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort({ createdDateTime: -1 }).exec(function (err, data) {
            if (err)
                res.send(err);
            var result = [];
            if (data) {
                data.sort(function (a, b) {
                    return new Date(b.createdDateTime).getTime() - new Date(a.createdDateTime).getTime();
                });
                for (var i = 0; i < data.length; i++) {
                    var object = data[i].toObject();
                    object.commentsCount = data[i].comments.length;
                    delete object.comments;
                    var likesCount = 0;
                    var playedCount = 0;
                    var viewsCount = 0;
                    for (var k = 0; k < object.userActions.length; k++) {
                        if (object.userActions[k].isViewed === 1)
                            viewsCount = +viewsCount + 1
                        if (object.userActions[k].isLiked === 1)
                            likesCount = +likesCount + 1
                        if (object.userActions[k].isAnswered === 1)
                            playedCount = +playedCount + 1
                    }
                    var commentsCount = 0;
                    for (var c = 0; c < data[i].comments.length; c++) {
                        if (!data[i].comments[c].isDeleted) {
                            commentsCount = +commentsCount + 1;
                        }
                    }
                    object.commentsCount = commentsCount;
                    object.likesCount = likesCount;
                    object.viewsCount = viewsCount;
                    object.playedCount = playedCount;
                    delete object.userActions;
                    object.createdDateTime = moment(data[i].createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                    object.modifiedDateTime = moment(data[i].modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                    result.push(object);
                }
                Contentpacks.count(query, function (err, c) {
                    res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
                });
            }
        });
    });

    app.get('/live/:number/:id', VerifyToken, function (req, res) {
        var query;
        if (req.params.id === "notFreelancer") {
            query = { isDeleted: false, isPublished: true };
        } else if (req.params.id !== "notFreelancer") {
            query = { isDeleted: false, isPublished: true, createdBy: req.params.id };
        }
        Contentpacks.find(query).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort({ createdDateTime: -1 }).exec(function (err, data) {
            if (err)
                res.send(err);
            var result = [];
            data.sort(function (a, b) {
                return new Date(b.createdDateTime).getTime() - new Date(a.createdDateTime).getTime();
            });
            for (var i = 0; i < data.length; i++) {
                var object = data[i].toObject();
                object.commentsCount = data[i].comments.length;
                delete object.comments;
                var likesCount = 0;
                var playedCount = 0;
                var viewsCount = 0;
                for (var k = 0; k < object.userActions.length; k++) {
                    if (object.userActions[k].isViewed === 1)
                        viewsCount = +viewsCount + 1
                    if (object.userActions[k].isLiked === 1)
                        likesCount = +likesCount + 1
                    if (object.userActions[k].isAnswered === 1)
                        playedCount = +playedCount + 1
                }
                var commentsCount = 0;
                for (var c = 0; c < data[i].comments.length; c++) {
                    if (!data[i].comments[c].isDeleted) {
                        commentsCount = +commentsCount + 1;
                    }
                }
                object.commentsCount = commentsCount;
                object.likesCount = likesCount;
                object.viewsCount = viewsCount;
                object.playedCount = playedCount;
                delete object.userActions;
                object.createdDateTime = moment(data[i].createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                object.modifiedDateTime = moment(data[i].modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.push(object);
            }
            Contentpacks.count(query, function (err, c) {
                res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
            });

        });
    });

    app.get('/queued/:number/:id', VerifyToken, function (req, res) {
        var query;
        if (req.params.id === "notFreelancer") {
            query = { isDeleted: false, isPublished: false };
        } else if (req.params.id !== "notFreelancer") {
            query = { isDeleted: false, isPublished: false, createdBy: req.params.id };
        }
        Contentpacks.find(query).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort({ createdDateTime: -1 }).exec(function (err, data) {
            if (err)
                res.send(err);
            var result = [];
            data.sort(function (a, b) {
                return new Date(b.createdDateTime).getTime() - new Date(a.createdDateTime).getTime();
            });
            for (var i = 0; i < data.length; i++) {
                var object = data[i].toObject();
                object.commentsCount = data[i].comments.length;
                delete object.comments;
                var likesCount = 0;
                var playedCount = 0;
                var viewsCount = 0;
                for (var k = 0; k < object.userActions.length; k++) {
                    if (object.userActions[k].isViewed === 1)
                        viewsCount = +viewsCount + 1
                    if (object.userActions[k].isLiked === 1)
                        likesCount = +likesCount + 1
                    if (object.userActions[k].isAnswered === 1)
                        playedCount = +playedCount + 1
                }
                var commentsCount = 0;
                for (var c = 0; c < data[i].comments.length; c++) {
                    if (!data[i].comments[c].isDeleted) {
                        commentsCount = +commentsCount + 1;
                    }
                }
                object.commentsCount = commentsCount;
                object.likesCount = likesCount;
                object.viewsCount = viewsCount;
                object.playedCount = playedCount;
                delete object.userActions;
                object.createdDateTime = moment(data[i].createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                object.modifiedDateTime = moment(data[i].modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.push(object);
            }
            Contentpacks.count(query, function (err, c) {
                res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
            });

        });
    });

    app.get('/closed/:number/:id', VerifyToken, function (req, res) {
        var query;
        if (req.params.id === "notFreelancer") {
            query = { isDeleted: true };
        } else if (req.params.id !== "notFreelancer") {
            query = { isDeleted: true, createdBy: req.params.id };
        }
        Contentpacks.find(query).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort({ createdDateTime: -1 }).exec(function (err, data) {
            if (err)
                res.send(err);
            var result = [];
            data.sort(function (a, b) {
                return new Date(b.createdDateTime).getTime() - new Date(a.createdDateTime).getTime();
            });
            for (var i = 0; i < data.length; i++) {
                var object = data[i].toObject();
                object.commentsCount = data[i].comments.length;
                delete object.comments;
                var likesCount = 0;
                var playedCount = 0;
                var viewsCount = 0;
                for (var k = 0; k < object.userActions.length; k++) {
                    if (object.userActions[k].isViewed === 1)
                        viewsCount = +viewsCount + 1
                    if (object.userActions[k].isLiked === 1)
                        likesCount = +likesCount + 1
                    if (object.userActions[k].isAnswered === 1)
                        playedCount = +playedCount + 1
                }
                var commentsCount = 0;
                for (var c = 0; c < data[i].comments.length; c++) {
                    if (!data[i].comments[c].isDeleted) {
                        commentsCount = +commentsCount + 1;
                    }
                }
                object.commentsCount = commentsCount;
                object.likesCount = likesCount;
                object.viewsCount = viewsCount;
                object.playedCount = playedCount;
                delete object.userActions;
                object.createdDateTime = moment(data[i].createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                object.modifiedDateTime = moment(data[i].modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.push(object);
            }
            Contentpacks.count(query, function (err, c) {
                res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
            });

        });
    });


    app.get('/pack-by-subcategory/:tab/:number/:id', VerifyToken, function (req, res) {
        var query;
        if (req.params.id != "notFreelancer") {
            if (req.params.tab === "All") {
                query = { subCategoryId: req.query.subCatId, createdBy: req.params.id }
            } else if (req.params.tab === "Live") {
                query = { subCategoryId: req.query.subCatId, createdBy: req.params.id, isDeleted: false, isPublished: true }
            } else if (req.params.tab === "Queued") {
                query = { subCategoryId: req.query.subCatId, createdBy: req.params.id, isDeleted: false, isPublished: false }
            } else if (req.params.tab === "Closed") {
                query = { subCategoryId: req.query.subCatId, createdBy: req.params.id, isDeleted: true }
            }
        } else if (req.params.id === "notFreelancer") {
            if (req.params.tab === "All") {
                query = { subCategoryId: req.query.subCatId }
            } else if (req.params.tab === "Live") {
                query = { subCategoryId: req.query.subCatId, isDeleted: false, isPublished: true }
            } else if (req.params.tab === "Queued") {
                query = { subCategoryId: req.query.subCatId, isDeleted: false, isPublished: false }
            } else if (req.params.tab === "Closed") {
                query = { subCategoryId: req.query.subCatId, isDeleted: true }
            }
        }
        Contentpacks.find(query).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort({ createdDateTime: -1 }).exec(function (err, data) {
            if (err)
                res.send(err);
            var result = [];
            data.sort(function (a, b) {
                return new Date(b.createdDateTime).getTime() - new Date(a.createdDateTime).getTime();
            });
            for (var i = 0; i < data.length; i++) {
                var object = data[i].toObject();
                object.commentsCount = data[i].comments.length;
                delete object.comments;
                var likesCount = 0;
                var playedCount = 0;
                var viewsCount = 0;
                for (var k = 0; k < object.userActions.length; k++) {
                    if (object.userActions[k].isViewed === 1)
                        viewsCount = +viewsCount + 1
                    if (object.userActions[k].isLiked === 1)
                        likesCount = +likesCount + 1
                    if (object.userActions[k].isAnswered === 1)
                        playedCount = +playedCount + 1
                }
                var commentsCount = 0;
                for (var c = 0; c < data[i].comments.length; c++) {
                    if (!data[i].comments[c].isDeleted) {
                        commentsCount = +commentsCount + 1;
                    }
                }
                object.commentsCount = commentsCount;
                object.likesCount = likesCount;
                object.viewsCount = viewsCount;
                object.playedCount = playedCount;
                delete object.userActions;
                object.createdDateTime = moment(data[i].createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                object.modifiedDateTime = moment(data[i].modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.push(object);
            }
            Contentpacks.count(query, function (err, c) {
                res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
            });
        });
    });

    app.get('/pack-by-celebrityname/:tab/:number/:id', VerifyToken, function (req, res) {
        var query;
        if (req.params.id != "notFreelancer") {
            if (req.params.tab === "All") {
                query = { celebrityName: req.query.celName, createdBy: req.params.id }
            } else if (req.params.tab === "Live") {
                query = { celebrityName: req.query.celName, createdBy: req.params.id, isDeleted: false, isPublished: true }
            } else if (req.params.tab === "Queued") {
                query = { celebrityName: req.query.celName, createdBy: req.params.id, isDeleted: false, isPublished: false }
            } else if (req.params.tab === "Closed") {
                query = { celebrityName: req.query.celName, createdBy: req.params.id, isDeleted: true }
            }
        } else if (req.params.id === "notFreelancer") {
            if (req.params.tab === "All") {
                query = { celebrityName: req.query.celName }
            } else if (req.params.tab === "Live") {
                query = { celebrityName: req.query.celName, isDeleted: false, isPublished: true }
            } else if (req.params.tab === "Queued") {
                query = { celebrityName: req.query.celName, isDeleted: false, isPublished: false }
            } else if (req.params.tab === "Closed") {
                query = { celebrityName: req.query.celName, isDeleted: true }
            }
        }
        Contentpacks.find(query).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort({ createdDateTime: -1 }).exec(function (err, data) {
            if (err)
                res.send(err);
            var result = [];
            data.sort(function (a, b) {
                return new Date(b.createdDateTime).getTime() - new Date(a.createdDateTime).getTime();
            });
            for (var i = 0; i < data.length; i++) {
                var object = data[i].toObject();
                object.commentsCount = data[i].comments.length;
                delete object.comments;
                var likesCount = 0;
                var playedCount = 0;
                var viewsCount = 0;
                for (var k = 0; k < object.userActions.length; k++) {
                    if (object.userActions[k].isViewed === 1)
                        viewsCount = +viewsCount + 1
                    if (object.userActions[k].isLiked === 1)
                        likesCount = +likesCount + 1
                    if (object.userActions[k].isAnswered === 1)
                        playedCount = +playedCount + 1
                }
                var commentsCount = 0;
                for (var c = 0; c < data[i].comments.length; c++) {
                    if (!data[i].comments[c].isDeleted) {
                        commentsCount = +commentsCount + 1;
                    }
                }
                object.commentsCount = commentsCount;
                object.likesCount = likesCount;
                object.viewsCount = viewsCount;
                object.playedCount = playedCount;
                delete object.userActions;
                object.createdDateTime = moment(data[i].createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                object.modifiedDateTime = moment(data[i].modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.push(object);
            }
            Contentpacks.count(query, function (err, c) {
                res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
            });
        });
    });


    app.delete('/pack/:packId', VerifyToken, function (req, res) {
        Contentpacks.remove({
            _id: req.params.packId
        }, function (err, data) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Pack successfully deleted." });
        });
    });

    // function packDetails(arr, i) {
    //     var promise = new Promise((resolve, reject) => {
    //         ContentPack.find({ categoryId: ObjectId(arr[i]._id), "isPublished": true }).count().exec(function (err, packsAvailable) {
    //             if (err)
    //                 reject(err)
    //             else {
    //                 console.log("paskcs", packsAvailable);
    //                 resolve(packsAvailable)
    //                 //data[arr[i]] = packsAvailable;
    //             }
    //         })
    //     })

    //     return promise;
    // }

    //Old
    // app.get('/repots', VerifyToken, (req, res) => {
    //     var obj = {};
    //     var masterCategories = ["100000000000000000000001", "100000000000000000000002", "100000000000000000000003", "100000000000000000000004"];
    //     ContentPack.find({ "isPublished": true }).count().exec(function (err, packsAvailable) {
    //         if (err)
    //             res.send(err)
    //         else {
    //             ContentPack.distinct('_id', { 'userActions.isViewed': { $exists: true } }).exec(function (err, viewedPacks) {
    //                 if (err)
    //                     res.send(err)
    //                 else {
    //                     obj.packsAvailable = packsAvailable;
    //                     obj.viewedPacks = viewedPacks.length;
    //                     ContentPack.distinct('_id', { 'userActions.isAnswered': { $exists: true } }).exec(function (err, answeredPacks) {
    //                         if (err)
    //                             res.send(err)
    //                         else {
    //                             obj.answeredPacks = answeredPacks.length;
    //                             ContentPack.distinct('userActions.userId', { 'userActions.isAnswered': 1 }).exec(function (err, distinctUsers) {
    //                                 if (err)
    //                                     res.send(err)
    //                                 else {
    //                                     obj.distinctUsers = distinctUsers.length;
    //                                     ContentPack.aggregate([
    //                                         { $unwind: "$userActions" },
    //                                         { $match: { "userActions.isAnswered": 1 } },
    //                                         { $group: { _id: "$categoryId", mostCompleted: { $sum: 1 } } },
    //                                         { $sort: { mostCompleted: -1 } }], function (err, mostPlayedCWisePacks) {
    //                                             if (err)
    //                                                 res.send(err)
    //                                             else {
    //                                                 // obj.mostPlayedCWisePacks = mostPlayedCWisePacks;
    //                                                 ContentPack.aggregate([
    //                                                     { $unwind: "$userActions" },
    //                                                     { $match: { "userActions.isAnswered": 1 } },
    //                                                     { $group: { _id: "$subCategoryId", subCategoryIdCompleted: { $sum: 1 } } },
    //                                                     { $sort: { subCategoryIdCompleted: -1 } }], function (err, mostPlayedSWisePacks) {
    //                                                         if (err)
    //                                                             res.send(err)
    //                                                         else {
    //                                                             // obj.mostPlayedSWisePacks=mostPlayedSWisePacks;
    //                                                             for (var i = 0; i < mostPlayedCWisePacks.length; i++) {
    //                                                                 packDetails(mostPlayedCWisePacks, i).then((result) => {
    //                                                                     //console.log("result",result);
    //                                                                     console.log("result", mostPlayedCWisePacks[i]);
    //                                                                     mostPlayedCWisePacks[i].publishedCount = result;
    //                                                                     console.log(mostPlayedCWisePacks, "prmise")
    //                                                                 })
    //                                                                 console.log(mostPlayedCWisePacks, "outprmise")
    //                                                                 //console.log("temp", data)
    //                                                             }
    //                                                             Categories.find({}, function (err, categories) {
    //                                                                 if (categories) {
    //                                                                     for (let j of mostPlayedCWisePacks) {
    //                                                                         for (let i of categories) {
    //                                                                             if (String(j._id) === String(i._id)) {
    //                                                                                 j._id = i.name;
    //                                                                             }
    //                                                                         }
    //                                                                     }
    //                                                                     for (let i of categories) {
    //                                                                         for (let p of mostPlayedSWisePacks) {
    //                                                                             for (let k of i.subCategories) {
    //                                                                                 if (String(p._id) === String(k._id)) {
    //                                                                                     p._id = k.name;
    //                                                                                 }
    //                                                                             }
    //                                                                         }
    //                                                                     }
    //                                                                 }
    //                                                                 obj.mostPlayedCWisePacks = mostPlayedCWisePacks;
    //                                                                 console.log(mostPlayedCWisePacks)
    //                                                                 obj.mostPlayedSWisePacks = mostPlayedSWisePacks;
    //                                                                 res.json({ status: 200, message: "Success", data: obj })
    //                                                             })
    //                                                         }
    //                                                     })
    //                                             }
    //                                         })
    //                                 }
    //                             })
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //     })
    // })



    app.post('/datewiseReportCategory', VerifyToken, (req, res) => {
        var input = req.body
        var fromDate = input.fromDate;
        var toDate = input.toDate;
        var obj = {};
        ContentPack.aggregate([
            { $match: { "createdDateTime": { $gte: new Date(fromDate), $lte: new Date(toDate) }, "isPublished": true } },
            { $group: { _id: "$categoryId", publishedCount: { $sum: 1 } } },
        ], function (err, publishedCount) {
            if (err)
                res.send(err)
            else {
                ContentPack.aggregate([
                    { $unwind: "$userActions" },
                    { $match: { "createdDateTime": { $gte: new Date(fromDate), $lte: new Date(toDate) }, "userActions.isAnswered": 1 } },
                    { $group: { _id: "$categoryId", mostCompleted: { $sum: 1 } } },
                    { $sort: { mostCompleted: -1 } }], function (err, mostPlayedCWisePacks) {
                        if (err)
                            res.send(err)
                        else {
                            ContentPack.aggregate([
                                { $unwind: "$userActions" },
                                {
                                    $match: {
                                        "userActions.lastAnsweredDate": { $gte: new Date(fromDate), $lte: new Date(toDate) },
                                        "userActions.isAnswered": 1
                                    }
                                },
                                { $group: { _id: "$categoryId", answeredCount: { $sum: 1 } } },
                                { $sort: { answeredCount: -1 } }], function (err, viewersCount) {
                                    if (err)
                                        res.send(err)
                                    else {
                                        ContentPack.aggregate([
                                            { $unwind: "$userActions" },
                                            {
                                                $match: {
                                                    "userActions.lastVisitDate": { $gte: new Date(fromDate), $lte: new Date(toDate) },
                                                    "userActions.isViewed": 1
                                                }
                                            },
                                            { $group: { _id: "$categoryId", viewedCount: { $sum: 1 } } },
                                            { $sort: { viewedCount: -1 } }], function (err, viewsCount) {
                                                if (err)
                                                    res.send(err)
                                                else {
                                                    //res.json({ status: 200, message: "success", data: viewedcountCwise })
                                                    Categories.find({}, function (err, categories) {
                                                        if (categories) {
                                                            for (let j of mostPlayedCWisePacks) {
                                                                for (let i of categories) {
                                                                    if (String(j._id) == String(i._id)) {
                                                                        j._id = i.name
                                                                    }
                                                                }
                                                            }
                                                            for (let j of publishedCount) {
                                                                for (let i of categories) {
                                                                    if (String(j._id) == String(i._id)) {
                                                                        j._id = i.name
                                                                    }
                                                                }
                                                            }
                                                            for (let j of viewersCount) {
                                                                for (let i of categories) {
                                                                    if (String(j._id) == String(i._id)) {
                                                                        j._id = i.name
                                                                    }
                                                                }
                                                            }
                                                            for (let j of viewsCount) {
                                                                for (let i of categories) {
                                                                    if (String(i._id) == String(j._id)) {
                                                                        j._id = i.name
                                                                    }
                                                                }
                                                            }


                                                            for (let m of mostPlayedCWisePacks) {
                                                                for (let n of publishedCount) {
                                                                    if (String(m._id) == String(n._id)) {
                                                                        m.publishedCount = n.publishedCount
                                                                    }
                                                                }
                                                            }

                                                            for (let m of mostPlayedCWisePacks) {
                                                                for (let p of viewersCount) {
                                                                    if (String(m._id) == String(p._id)) {
                                                                        m.viewersCount = p.answeredCount
                                                                    }
                                                                }
                                                            }

                                                            for (let m of mostPlayedCWisePacks) {
                                                                for (let y of viewsCount) {
                                                                    if (String(m._id) == String(y._id)) {
                                                                        m.viewsCount = y.viewedCount
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        obj.mostPlayedCWisePacks = mostPlayedCWisePacks
                                                        res.json({ status: 200, message: "Success", data: obj })
                                                    })
                                                }
                                            })
                                    }
                                })
                        }
                    })
            }

        })
    })

    app.post('/datewiseReportSubcategory', VerifyToken, (req, res) => {
        var input = req.body
        var fromDate = input.fromDate;
        var toDate = input.toDate;
        var obj = {};
        ContentPack.aggregate([
            { $match: { "createdDateTime": { $gte: new Date(fromDate), $lte: new Date(toDate) }, "isPublished": true } },
            { $group: { _id: "$subCategoryId", publishedCount: { $sum: 1 } } },
        ], function (err, publishedCount) {
            if (err)
                res.send(err)
            else {
                ContentPack.aggregate([
                    { $unwind: "$userActions" },
                    { $match: { "createdDateTime": { $gte: new Date(fromDate), $lte: new Date(toDate) }, "userActions.isAnswered": 1 } },
                    { $group: { _id: "$subCategoryId", subCategoryIdCompleted: { $sum: 1 } } },
                    { $sort: { subCategoryIdCompleted: -1 } }], function (err, mostPlayedSWisePacks) {
                        if (err)
                            res.send(err)
                        else {
                            ContentPack.aggregate([
                                { $unwind: "$userActions" },
                                {
                                    $match: {
                                        "userActions.lastAnsweredDate": { $gte: new Date(fromDate), $lte: new Date(toDate) },
                                        "userActions.isAnswered": 1
                                    }
                                },
                                { $group: { _id: "$subCategoryId", answeredCount: { $sum: 1 } } },
                                { $sort: { answeredCount: -1 } }], function (err, viewersCount) {
                                    if (err)
                                        res.send(err)
                                    else {
                                        ContentPack.aggregate([
                                            { $unwind: "$userActions" },
                                            {
                                                $match: {
                                                    "userActions.lastVisitDate": { $gte: new Date(fromDate), $lte: new Date(toDate) },
                                                    "userActions.isViewed": 1
                                                }
                                            },
                                            { $group: { _id: "$subCategoryId", viewedCount: { $sum: 1 } } },
                                            { $sort: { viewedCount: -1 } }], function (err, viewsCount) {
                                                if (err)
                                                    res.send(err)
                                                else {
                                                    //res.json({ status: 200, message: "success", data: viewedcountCwise })
                                                    Categories.find({}, function (err, categories) {
                                                        if (categories) {
                                                            for (let j of mostPlayedSWisePacks) {
                                                                for (let i of categories) {
                                                                    for(let e of i.subCategories){
                                                                        if (String(j._id) == String(e._id)) {
                                                                            j._id = e.name
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            for (let k of publishedCount) {
                                                                for (let i of categories) {
                                                                    for(let e of i.subCategories){
                                                                        if (String(k._id) == String(e._id)) {
                                                                            k._id = e.name
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            for (let l of viewersCount) {
                                                                for (let i of categories) {
                                                                    for(let e of i.subCategories){
                                                                        if (String(l._id) == String(e._id)) {
                                                                            l._id = e.name
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            for (let q of viewsCount) {
                                                                for (let i of categories) {
                                                                    for(let e of i.subCategories){
                                                                        if (String(q._id) == String(e._id)) {
                                                                            q._id = e.name
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            for (let m of mostPlayedSWisePacks) {
                                                                for (let n of publishedCount) {
                                                                    if (String(m._id) == String(n._id)) {
                                                                        m.publishedCount = n.publishedCount
                                                                    }
                                                                }
                                                            }

                                                            for (let o of mostPlayedSWisePacks) {
                                                                for (let p of viewersCount) {
                                                                    if (String(o._id) == String(p._id)) {
                                                                        o.viewersCount = p.answeredCount
                                                                    }
                                                                }
                                                            }

                                                            for (let x of mostPlayedSWisePacks) {
                                                                for (let y of viewsCount) {
                                                                    if (String(x._id) == String(y._id)) {
                                                                        x.viewsCount = y.viewedCount
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        obj.mostPlayedSWisePacks = mostPlayedSWisePacks
                                                        res.json({ status: 200, message: "Success", data: obj })
                                                    })
                                                }
                                            })
                                    }
                                })
                        }
                    })
            }

        })

    })



    app.get('/generateReport', VerifyToken, (req, res) => {
        var obj = {};
        ContentPack.find({ ",,": true }).count().exec(function (err, packsAvailable) {
            if (err)
                res.send(err)
            else {
                ContentPack.aggregate([
                    { $match: { "isPublished": true } },
                    { $group: { _id: "$categoryId", publishedCount: { $sum: 1 } } },
                ], function (err, publishedCount) {
                    if (err)
                        res.send(err)
                    else {
                        ContentPack.aggregate([
                            { $match: { "isPublished": true } },
                            { $group: { _id: "$subCategoryId", publishedCount: { $sum: 1 } } },
                        ], function (err, spublishedCount) {
                            if (err)
                                res.send(err)
                            else {
                                ContentPack.aggregate([
                                    { $unwind: "$userActions" },
                                    { $match: { "userActions.isAnswered": 1 } },
                                    {
                                        $group: {
                                            _id: "$categoryId", mostCompleted: { $sum: 1 }, viewsCount: { $sum: { $add: ["$totalViewsCount"] } },
                                            viewersCount: { $sum: { $add: ["$answeredCount"] } }
                                        }
                                    },
                                    { $sort: { mostCompleted: -1 } }], function (err, mostPlayedCWisePacks) {
                                        if (err)
                                            res.send(err)
                                        else {

                                            ContentPack.aggregate([
                                                { $unwind: "$userActions" },
                                                { $match: { "userActions.isAnswered": 1 } },
                                                {
                                                    $group: {
                                                        _id: "$subCategoryId", subCategoryIdCompleted: { $sum: 1 },
                                                        viewsCount: { $sum: { $add: ["$totalViewsCount"] } },
                                                        viewersCount: { $sum: { $add: ["$answeredCount"] } }
                                                    }
                                                },
                                                { $sort: { subCategoryIdCompleted: -1 } }], function (err, mostPlayedSWisePacks) {
                                                    if (err)
                                                        res.send(err)
                                                    else {
                                                        Categories.find({}, function (err, categories) {
                                                            if (categories) {
                                                                for (let j of mostPlayedCWisePacks) {
                                                                    for (let i of categories) {
                                                                        if (String(j._id) === String(i._id)) {
                                                                            j._id = i.name;
                                                                        }
                                                                    }
                                                                }
                                                                for (let i of categories) {
                                                                    for (let p of mostPlayedSWisePacks) {
                                                                        for (let k of i.subCategories) {
                                                                            if (String(p._id) === String(k._id)) {
                                                                                p._id = k.name;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                for (let m of publishedCount) {
                                                                    for (let n of categories) {
                                                                        if (String(m._id) === String(n._id)) {
                                                                            m._id = n.name
                                                                        }
                                                                    }

                                                                }
                                                                for (let z of categories) {
                                                                    for (let x of spublishedCount) {
                                                                        for (let y of z.subCategories) {
                                                                            if (String(x._id) === String(y._id)) {
                                                                                x._id = y.name
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            for (let i of mostPlayedCWisePacks) {
                                                                for (let j of publishedCount) {
                                                                    if (String(j._id) === String(i._id)) {
                                                                        i.publishedCount = j.publishedCount;
                                                                    }
                                                                }
                                                            }
                                                            for (let x of mostPlayedSWisePacks) {
                                                                for (let y of spublishedCount) {
                                                                    if (String(y._id) === String(x._id)) {
                                                                        x.publishedCount = y.publishedCount
                                                                    }
                                                                }
                                                            }
                                                            obj.mostPlayedCWisePacks = mostPlayedCWisePacks;
                                                            obj.mostPlayedSWisePacks = mostPlayedSWisePacks;
                                                            //obj.spublishedCount = spublishedCount
                                                            //console.log(publishedCount)
                                                            res.json({ status: 200, message: "Success", data: obj })
                                                        })
                                                    }
                                                })
                                        }
                                    })
                            }
                        })
                    }
                })
            }
        })
    })



    //To Generate Fun2Win overall report
    // app.get('/generateReport', VerifyToken, function (req, res) {
    //     Contentpacks.find({ "isPublished": true }).co$lunt().exec(function (err, packsAvailable) {
    //         if (err)
    //             res.send(err)
    //         else if (packsAvailable) {
    //             Contentpacks.distinct('_id', { 'userActions.isViewed': { $exists: true } }).exec(function (err, viewedPacks) {
    //                 if (err)
    //                     res.send(err)
    //                 else if (viewedPacks) {
    //                     Contentpacks.distinct('_id', { 'userActions.isAnswered': { $exists: true } }).exec(function (err, answeredPacks) {
    //                         if (err)
    //                             res.send(err)
    //                         else if (answeredPacks) {
    //                             Contentpacks.distinct('userActions.userId', { 'userActions.isAnswered': 1 }).exec(function (err, distinctUsers) {
    //                                 if (err)
    //                                     res.send(err)
    //                                 else if (distinctUsers) {
    //                                     Contentpacks.aggregate([
    //                                         { $unwind: "$userActions" },
    //                                         { $match: { "userActions.isAnswered": 1 } },
    //                                         { $group: { _id: "$categoryId", mostCompleted: { $sum: 1 } } },
    //                                         { $sort: { mostCompleted: -1 } }], function (err, mostPlayedCWisePacks) {
    //                                             if (err)
    //                                                 res.send(err)
    //                                             else if (mostPlayedCWisePacks) {
    //                                                 Contentpacks.aggregate([
    //                                                     { $unwind: "$userActions" },
    //                                                     { $match: { "userActions.isAnswered": 1 } },
    //                                                     { $group: { _id: "$subCategoryId", subCategoryIdCompleted: { $sum: 1 } } },
    //                                                     { $sort: { subCategoryIdCompleted: -1 } }], function (err, mostPlayedSWisePacks) {
    //                                                         if (err)
    //                                                             res.send(err)
    //                                                         else if (mostPlayedSWisePacks) {
    //                                                             // Contentpacks.aggregate([
    //                                                             //     { $unwind: "$userActions" },
    //                                                             //     { $match: { "userActions.isAnswered": 1 } },
    //                                                             //     { $group: { _id: "$categoryId", mostCompleted: { $sum: 1 } } },
    //                                                             //     { $sort: { mostCompleted: 1 } }], function (err, leastPlayedCWisePacks) {
    //                                                             //         if (err)
    //                                                             //             res.send(err)
    //                                                             //         else if (leastPlayedCWisePacks) {
    //                                                             //             Contentpacks.aggregate([
    //                                                             //                 { $unwind: "$userActions" },
    //                                                             //                 { $match: { "userActions.isAnswered": 1 } },
    //                                                             //                 { $group: { _id: "$subCategoryId", subCategoryIdCompleted: { $sum: 1 } } },
    //                                                             //                 { $sort: { subCategoryIdCompleted: 1 } }], function (err, leastPlayedSWisePacks) {
    //                                                             // if (err)
    //                                                             //     res.send(err)
    //                                                             // else if (leastPlayedSWisePacks) {
    //                                                             Categories.find({}, function (err, categories) {
    //                                                                 if (categories) {
    //                                                                     for (let j of mostPlayedCWisePacks) {
    //                                                                         for (let i of categories) {
    //                                                                             if (String(j._id) === String(i._id)) {
    //                                                                                 j._id = i.name;
    //                                                                             }
    //                                                                         }
    //                                                                     }
    //                                                                     for (let i of categories) {
    //                                                                         for (let p of mostPlayedSWisePacks) {
    //                                                                             for (let k of i.subCategories) {
    //                                                                                 if (String(p._id) === String(k._id)) {
    //                                                                                     p._id = k.name;
    //                                                                                 }
    //                                                                             }
    //                                                                         }
    //                                                                     }
    //                                                                     var report = {};
    //                                                                     // var leastC = mostPlayedCWisePacks.slice(0)
    //                                                                     // var leastS = mostPlayedSWisePacks.slice(0)
    //                                                                     report.packsAvailable = packsAvailable
    //                                                                     report.viewedPacks = viewedPacks.length
    //                                                                     report.answeredPacks = answeredPacks.length
    //                                                                     report.distinctUsers = distinctUsers.length
    //                                                                     report.mostPlayedCWisePacks = mostPlayedCWisePacks
    //                                                                     report.mostPlayedSWisePacks = mostPlayedSWisePacks
    //                                                                     // report.leastPlayedCWisePacks = leastC.reverse()
    //                                                                     // report.leastPlayedSWisePacks = leastS.reverse()
    //                                                                     res.json({ status: 200, message: 'Success', data: report })
    //                                                                 }
    //                                                             })
    //                                                         }
    //                                                     })
    //                                             }
    //                                         })
    //                                 }
    //                             })
    //                         }
    //                     }
    //                     )
    //                 }
    //             })
    //         }
    //     })
    // });

    /* =====New Services======= */
    /* Save the Content Packs */
    app.post('/create-pack', VerifyToken, function (req, res) {
        var input = req.body;
        input.createdDateTime = utils.dateInUTC();
        input.modifiedDateTime = utils.dateInUTC();
        const contentPack = new ContentPack(input);
        contentPack.save((saveErr) => {
            if (saveErr) {
                res.json({ status: 404, message: "Failure", data: saveErr });
            } else {
                var result = contentPack.toObject()
                result.createdDateTime = moment(contentPack.createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.modifiedDateTime = moment(contentPack.modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: result });
            }
        });
    });

    /* To update the content pack based on id */
    app.put('/update-pack/:packId', VerifyToken, function (req, res) {
        ContentPack.findOneAndUpdate({ _id: req.params.packId }, req.body, { new: true }, function (err, data) {
            if (err)
                res.send(err);
            else if (data) {
                var result = data.toObject()
                result.createdDateTime = moment(data.createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.modifiedDateTime = moment(data.modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: result });
            }
        });
    });

    /* To get the content pack based on the id */
    app.get('/get-pack/:packId', VerifyToken, function (req, res) {
        ContentPack.findById(req.params.packId, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                // console.log(data, '-->')
                // var likesCount = 0;
                var dislikesCount = 0;
                // var playedCount = 0;
                // var viewsCount = 0;
                var commentsCount = 0;
                var object = data.toObject();
                for (var i = 0; i < object.comments.length; i++) {
                    if (!object.comments[i].isDeleted) {
                        commentsCount = commentsCount + 1
                    }
                }
                object.commentsCount = commentsCount;
                delete object.comments;
                // for (var k = 0; k < object.userActions.length; k++) {
                //     if (object.userActions[k].isViewed === 1)
                //         viewsCount += 1
                //     if (object.userActions[k].isLiked === 1)
                //         likesCount += 1
                //     if (object.userActions[k].isAnswered === 1)
                //         playedCount += 1
                // }
                for (let a = 0; a < object.userFeedbacks.length; a++) {
                    if (object.userFeedbacks[a].like === 0) {
                        dislikesCount += 1;
                    }
                }
                // object.likesCount = likesCount;
                // object.viewsCount = viewsCount;
                // object.playedCount = playedCount;
                object.dislikesCount = dislikesCount;
                delete object.userActions;
                object.createdDateTime = moment(data.createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                object.modifiedDateTime = moment(data.modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: object });
            } else {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });

    /* To get all content-packs by pagignation and also on user login-base(freelancer/respective roles) */
    app.get('/all-packs/:number/:id', VerifyToken, function (req, res) {
        var query;
        if (req.params.id === "notFreelancer") {
            query = {};
        } else if (req.params.id !== "notFreelancer") {
            query = { createdBy: req.params.id };
        }
        ContentPack.find(query).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort({ createdDateTime: -1 }).exec(function (err, data) {
            if (err)
                res.send(err);
            var result = [];
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    var object = data[i].toObject();
                    object.commentsCount = data[i].comments.length;
                    delete object.comments;
                    var likesCount = 0;
                    var dislikesCount = 0;
                    var playedCount = 0;
                    var viewsCount = 0;
                    for (var k = 0; k < object.userActions.length; k++) {
                        if (object.userActions[k].isViewed === 1)
                            viewsCount += 1
                        if (object.userActions[k].isLiked === 1)
                            likesCount += 1
                        if (object.userActions[k].isAnswered === 1)
                            playedCount += 1
                    }
                    var commentsCount = 0;
                    for (var c = 0; c < data[i].comments.length; c++) {
                        if (!data[i].comments[c].isDeleted) {
                            commentsCount += 1;
                        }
                    }
                    for (let a = 0; a < object.userFeedbacks.length; a++) {
                        if (object.userFeedbacks[a].like === 0) {
                            dislikesCount += 1;
                        }
                    }
                    object.commentsCount = commentsCount;
                    object.likesCount = likesCount;
                    object.viewsCount = viewsCount;
                    object.playedCount = playedCount;
                    object.dislikesCount = dislikesCount;
                    delete object.userActions;
                    object.createdDateTime = moment(data[i].createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                    object.modifiedDateTime = moment(data[i].modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                    result.push(object);
                }
                ContentPack.count(query, function (err, c) {
                    res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
                });
            }
        });
    });

    /* To get the live packs by pagignation and also on user login-base(freelancer/respective roles) */
    app.get('/live-packs/:number/:id', VerifyToken, function (req, res) {
        var query;
        if (req.params.id === "notFreelancer") {
            query = { isDeleted: false, isPublished: true };
        } else if (req.params.id !== "notFreelancer") {
            query = { isDeleted: false, isPublished: true, createdBy: req.params.id };
        }
        ContentPack.find(query).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort({ createdDateTime: -1 }).exec(function (err, data) {
            if (err)
                res.send(err);
            var result = [];
            for (var i = 0; i < data.length; i++) {
                var object = data[i].toObject();
                var likesCount = 0;
                var dislikesCount = 0;
                var playedCount = 0;
                var viewsCount = 0;
                var commentsCount = 0;
                for (var k = 0; k < object.userActions.length; k++) {
                    if (object.userActions[k].isViewed === 1)
                        viewsCount += 1
                    if (object.userActions[k].isLiked === 1)
                        likesCount += 1
                    if (object.userActions[k].isAnswered === 1)
                        playedCount += 1
                }
                for (var c = 0; c < data[i].comments.length; c++) {
                    if (!data[i].comments[c].isDeleted) {
                        commentsCount += 1;
                    }
                }
                for (let a = 0; a < object.userFeedbacks.length; a++) {
                    if (object.userFeedbacks[a].like === 0) {
                        dislikesCount += 1;
                    }
                }
                object.commentsCount = commentsCount;
                object.likesCount = likesCount;
                object.viewsCount = viewsCount;
                object.playedCount = playedCount;
                object.dislikesCount = dislikesCount;
                delete object.userActions;
                object.createdDateTime = moment(data[i].createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                object.modifiedDateTime = moment(data[i].modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.push(object);
            }
            ContentPack.count(query, function (err, c) {
                res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
            });

        });
    });

    /* To get the queued packs by pagignation and also on user login-base(freelancer/respective-roles) */
    app.get('/queued-packs/:number/:id', VerifyToken, function (req, res) {
        var query;
        if (req.params.id === "notFreelancer") {
            query = { isDeleted: false, isPublished: false };
        } else if (req.params.id !== "notFreelancer") {
            query = { isDeleted: false, isPublished: false, createdBy: req.params.id };
        }
        ContentPack.find(query).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort({ createdDateTime: -1 }).exec(function (err, data) {
            if (err)
                res.send(err);
            var result = [];
            for (var i = 0; i < data.length; i++) {
                var object = data[i].toObject();
                var likesCount = 0;
                var dislikesCount = 0;
                var playedCount = 0;
                var viewsCount = 0;
                var commentsCount = 0;
                for (var k = 0; k < object.userActions.length; k++) {
                    if (object.userActions[k].isViewed === 1)
                        viewsCount += 1
                    if (object.userActions[k].isLiked === 1)
                        likesCount += 1
                    if (object.userActions[k].isAnswered === 1)
                        playedCount += 1
                }
                for (var c = 0; c < data[i].comments.length; c++) {
                    if (!data[i].comments[c].isDeleted) {
                        commentsCount += 1;
                    }
                }
                for (let a = 0; a < object.userFeedbacks.length; a++) {
                    if (object.userFeedbacks[a].like === 0) {
                        dislikesCount += 1;
                    }
                }
                object.commentsCount = commentsCount;
                object.likesCount = likesCount;
                object.viewsCount = viewsCount;
                object.playedCount = playedCount;
                object.dislikesCount = dislikesCount;
                delete object.userActions;
                object.createdDateTime = moment(data[i].createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                object.modifiedDateTime = moment(data[i].modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.push(object);
            }
            ContentPack.count(query, function (err, c) {
                res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
            });
        });
    });

    /* To get all the closed-packs by pagignation and also on user login-base(freelancer/respective-roles) */
    app.get('/closed-packs/:number/:id', VerifyToken, function (req, res) {
        var query;
        if (req.params.id === "notFreelancer") {
            query = { isDeleted: true };
        } else if (req.params.id !== "notFreelancer") {
            query = { isDeleted: true, createdBy: req.params.id };
        }
        ContentPack.find(query).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort({ createdDateTime: -1 }).exec(function (err, data) {
            if (err)
                res.send(err);
            var result = [];
            for (var i = 0; i < data.length; i++) {
                var object = data[i].toObject();
                var likesCount = 0;
                var dislikesCount = 0;
                var playedCount = 0;
                var viewsCount = 0;
                var commentsCount = 0;
                for (var k = 0; k < object.userActions.length; k++) {
                    if (object.userActions[k].isViewed === 1)
                        viewsCount += 1
                    if (object.userActions[k].isLiked === 1)
                        likesCount += 1
                    if (object.userActions[k].isAnswered === 1)
                        playedCount += 1
                }
                for (var c = 0; c < data[i].comments.length; c++) {
                    if (!data[i].comments[c].isDeleted) {
                        commentsCount += 1;
                    }
                }
                for (let a = 0; a < object.userFeedbacks.length; a++) {
                    if (object.userFeedbacks[a].like === 0) {
                        dislikesCount += 1;
                    }
                }
                object.commentsCount = commentsCount;
                object.likesCount = likesCount;
                object.viewsCount = viewsCount;
                object.playedCount = playedCount;
                object.dislikesCount = dislikesCount;
                delete object.userActions;
                object.createdDateTime = moment(data[i].createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                object.modifiedDateTime = moment(data[i].modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.push(object);
            }
            ContentPack.count(query, function (err, c) {
                res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
            });
        });
    });

    /* To get all the content-packs by pagignation based on packType, login and pagignation number
        packType = ['all','live','queued', 'closed']
        id= ['notFreelancer', 'userId']
    */
    app.get('/content-packs/:packType/:id/:number', VerifyToken, function (req, res) {
        var query;
        if (req.params.packType === 'all') {
            if (req.params.id === "notFreelancer") {
                query = {};
            } else if (req.params.id !== "notFreelancer") {
                query = { createdBy: req.params.id };
            }
        } else if (req.params.packType === 'live') {
            if (req.params.id === "notFreelancer") {
                query = { isDeleted: false, isPublished: true };
            } else if (req.params.id !== "notFreelancer") {
                query = { isDeleted: false, isPublished: true, createdBy: req.params.id };
            }
        } else if (req.params.packType === 'queued') {
            if (req.params.id === "notFreelancer") {
                query = { isDeleted: false, isPublished: false };
            } else if (req.params.id !== "notFreelancer") {
                query = { isDeleted: false, isPublished: false, createdBy: req.params.id };
            }
        } else if (req.params.packType === 'closed') {
            if (req.params.id === "notFreelancer") {
                query = { isDeleted: true };
            } else if (req.params.id !== "notFreelancer") {
                query = { isDeleted: true, createdBy: req.params.id };
            }
        }
        ContentPack.find(query).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort({ createdDateTime: -1 }).exec(function (err, data) {
            if (err)
                res.send(err);
            var result = [];
            for (var i = 0; i < data.length; i++) {
                var object = data[i].toObject();
                // var likesCount = 0;
                var dislikesCount = 0;
                // var playedCount = 0;
                // var viewsCount = 0;
                var commentsCount = 0;
                // for (var k = 0; k < object.userActions.length; k++) {
                //     if (object.userActions[k].isViewed === 1)
                //         viewsCount += 1
                //     if (object.userActions[k].isLiked === 1)
                //         likesCount += 1
                //     if (object.userActions[k].isAnswered === 1)
                //         playedCount += 1
                // }
                for (var c = 0; c < data[i].comments.length; c++) {
                    if (!data[i].comments[c].isDeleted) {
                        commentsCount += 1;
                    }
                }
                for (let a = 0; a < object.userFeedbacks.length; a++) {
                    if (object.userFeedbacks[a].like === 0) {
                        dislikesCount += 1;
                    }
                }
                object.commentsCount = commentsCount;
                // object.likesCount = likesCount;
                // object.viewsCount = viewsCount;
                // object.playedCount = playedCount;
                object.dislikesCount = dislikesCount;
                delete object.userActions;
                delete object.comments;
                delete object.userFeedbacks;
                object.createdDateTime = moment(data[i].createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                object.modifiedDateTime = moment(data[i].modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.push(object);
            }
            ContentPack.count(query, function (err, c) {
                res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
            });
        });
    });

    /* To get the packs by subcategory, pagignation and also on user login-base(freelancer/respective-roles) */
    app.get('/packs-by-subcategory/:tab/:number/:id', VerifyToken, function (req, res) {
        var query;
        if (req.params.id != "notFreelancer") {
            if (req.params.tab === "All") {
                query = { subCategoryId: req.query.subCatId, createdBy: req.params.id }
            } else if (req.params.tab === "Live") {
                query = { subCategoryId: req.query.subCatId, createdBy: req.params.id, isDeleted: false, isPublished: true }
            } else if (req.params.tab === "Queued") {
                query = { subCategoryId: req.query.subCatId, createdBy: req.params.id, isDeleted: false, isPublished: false }
            } else if (req.params.tab === "Closed") {
                query = { subCategoryId: req.query.subCatId, createdBy: req.params.id, isDeleted: true }
            }
        } else if (req.params.id === "notFreelancer") {
            if (req.params.tab === "All") {
                query = { subCategoryId: req.query.subCatId }
            } else if (req.params.tab === "Live") {
                query = { subCategoryId: req.query.subCatId, isDeleted: false, isPublished: true }
            } else if (req.params.tab === "Queued") {
                query = { subCategoryId: req.query.subCatId, isDeleted: false, isPublished: false }
            } else if (req.params.tab === "Closed") {
                query = { subCategoryId: req.query.subCatId, isDeleted: true }
            }
        }
        ContentPack.find(query).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort({ createdDateTime: -1 }).exec(function (err, data) {
            if (err)
                res.send(err);
            var result = [];
            for (var i = 0; i < data.length; i++) {
                var object = data[i].toObject();
                // var likesCount = 0;
                // var playedCount = 0;
                // var viewsCount = 0;
                var commentsCount = 0;
                var dislikesCount = 0;
                // for (var k = 0; k < object.userActions.length; k++) {
                //     if (object.userActions[k].isViewed === 1)
                //         viewsCount += 1
                //     if (object.userActions[k].isLiked === 1)
                //         likesCount += 1
                //     if (object.userActions[k].isAnswered === 1)
                //         playedCount += 1
                // }
                for (var c = 0; c < data[i].comments.length; c++) {
                    if (!data[i].comments[c].isDeleted) {
                        commentsCount += 1;
                    }
                }
                for (let a = 0; a < object.userFeedbacks.length; a++) {
                    if (object.userFeedbacks[a].like === 0) {
                        dislikesCount += 1;
                    }
                }
                object.commentsCount = commentsCount;
                // object.likesCount = likesCount;
                // object.viewsCount = viewsCount;
                // object.playedCount = playedCount;
                object.dislikesCount = dislikesCount;
                delete object.userActions;
                object.createdDateTime = moment(data[i].createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                object.modifiedDateTime = moment(data[i].modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.push(object);
            }
            ContentPack.count(query, function (err, c) {
                res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
            });
        });
    });

    /* To get the packs by CelebrityName, Pagignation and also on the user login-basis(freelancer/other user) */
    app.get('/packs-by-celebrityname/:tab/:number/:id', VerifyToken, function (req, res) {
        var query;
        if (req.params.id != "notFreelancer") {
            if (req.params.tab === "All") {
                query = { celebrityName: req.query.celName, createdBy: req.params.id }
            } else if (req.params.tab === "Live") {
                query = { celebrityName: req.query.celName, createdBy: req.params.id, isDeleted: false, isPublished: true }
            } else if (req.params.tab === "Queued") {
                query = { celebrityName: req.query.celName, createdBy: req.params.id, isDeleted: false, isPublished: false }
            } else if (req.params.tab === "Closed") {
                query = { celebrityName: req.query.celName, createdBy: req.params.id, isDeleted: true }
            }
        } else if (req.params.id === "notFreelancer") {
            if (req.params.tab === "All") {
                query = { celebrityName: req.query.celName }
            } else if (req.params.tab === "Live") {
                query = { celebrityName: req.query.celName, isDeleted: false, isPublished: true }
            } else if (req.params.tab === "Queued") {
                query = { celebrityName: req.query.celName, isDeleted: false, isPublished: false }
            } else if (req.params.tab === "Closed") {
                query = { celebrityName: req.query.celName, isDeleted: true }
            }
        }
        ContentPack.find(query).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort({ createdDateTime: -1 }).exec(function (err, data) {
            if (err)
                res.send(err);
            var result = [];
            for (var i = 0; i < data.length; i++) {
                var object = data[i].toObject();
                // var likesCount = 0;
                // var playedCount = 0;
                // var viewsCount = 0;
                var commentsCount = 0;
                var dislikesCount = 0;
                // for (var k = 0; k < object.userActions.length; k++) {
                //     if (object.userActions[k].isViewed === 1)
                //         viewsCount += 1
                //     if (object.userActions[k].isLiked === 1)
                //         likesCount += 1
                //     if (object.userActions[k].isAnswered === 1)
                //         playedCount += 1
                // }
                for (var c = 0; c < data[i].comments.length; c++) {
                    if (!data[i].comments[c].isDeleted) {
                        commentsCount += 1;
                    }
                }
                for (let a = 0; a < object.userFeedbacks.length; a++) {
                    if (object.userFeedbacks[a].like === 0) {
                        dislikesCount += 1;
                    }
                }
                object.commentsCount = commentsCount;
                // object.likesCount = likesCount;
                // object.viewsCount = viewsCount;
                // object.playedCount = playedCount;
                object.dislikesCount = dislikesCount;
                delete object.userActions;
                object.createdDateTime = moment(data[i].createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                object.modifiedDateTime = moment(data[i].modifiedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.push(object);
            }
            ContentPack.count(query, function (err, c) {
                res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
            });
        });
    });

    /* To remove the Content-Pack based on the id */
    app.delete('/content-pack/:packId', VerifyToken, function (req, res) {
        ContentPack.findByIdAndRemove({
            _id: req.params.packId
        }, function (err, data) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Pack successfully deleted." });
        });
    });

    /* To search the Content-Packs using search key */
    app.get('/content-pack/search/:keyword', VerifyToken, function (req, res) {
        ContentPack.find({ name: { $regex: req.params.keyword, '$options': 'i' } }).select('_id name').exec(function (err, searchData) {
            if (err)
                res.send(err)
            else
                res.json({ status: 200, message: "Packs Fetched Successfully", data: searchData })
        })
    })
}