var Celebrities = require('../models/PushNotifications/CelebrityNames');
var VerifyToken = require('../security/TokenVerification');
var ObjectId = require('mongodb').ObjectID;
const moment = require('moment-timezone');

module.exports = function (app) {

    //Celebrity Information
    app.post('/celebrity', VerifyToken, function (req, res) {
        var input = req.body;
        const celebrities = new Celebrities(input);
        celebrities.save((saveErr) => {
            if (saveErr) {
                res.json({ status: 404, message: "Failure", data: saveErr });
            } else {
                var result = celebrities.toObject()
                result.createdDateTime = moment(celebrities.createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.updatedDateTime = moment(celebrities.updatedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: result });
            }
        });
    });

    //Get Celebrity details by Id
    app.get('/celebrity/:id', VerifyToken, function (req, res) {
        Celebrities.findById(req.params.id, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                var result = data.toObject();
                result.createdDateTime = moment(data.createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.updatedDateTime = moment(data.updatedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: result });
            } else {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });

    //To Get all the list of celebrities
    app.get('/celebrities/:number', VerifyToken, function (req, res) {
        if (req.params.number === "All") {
            Celebrities.find({}).sort({ "createdDateTime": -1 }).exec(function (err, data) {
                if (err) {
                    res.send(err);
                } else if (data) {
                    var result = [];
                    for (var i = 0; i < data.length; i++) {
                        var object = data[i].toObject();
                        delete object.songs;
                        delete object.trailers;
                        delete object.photos;
                        delete object.comments;
                        delete object.pinnedUsers;
                        object.createdDateTime = moment(data[i].createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                        object.updatedDateTime = moment(data[i].updatedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                        result.push(object)
                    }
                    // res.json({ status: 200, message: "Success", data: result });
                    Celebrities.find({}).count().exec(function (err, count) {
                        res.json({ status: 200, message: "Success", data: result, totalNumOfPages: (count % 12) == 0 ? parseInt((count / 12)) : parseInt((count / 12) + 1) });
                    })
                } else {
                    res.json({ status: 200, message: "Success", data: data });
                }
            });
        }
        else {
            Celebrities.find({}).sort({ "createdDateTime": -1 }).skip(parseInt(req.params.number - 1) * 12).limit(12).exec(function (err, data) {
                // Celebrities.find({}).sort({"createdDateTime": -1}).exec(function (err, data) {
                if (err) {
                    res.send(err);
                } else if (data) {
                    var result = [];
                    for (var i = 0; i < data.length; i++) {
                        var object = data[i].toObject();
                        delete object.songs;
                        delete object.trailers;
                        delete object.photos;
                        delete object.comments;
                        delete object.pinnedUsers;
                        object.createdDateTime = moment(data[i].createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                        object.updatedDateTime = moment(data[i].updatedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                        result.push(object)
                    }
                    // res.json({ status: 200, message: "Success", data: result });
                    Celebrities.find({}).count().exec(function (err, count) {
                        res.json({ status: 200, message: "Success", data: result, totalNumOfPages: (count % 12) == 0 ? parseInt((count / 12)) : parseInt((count / 12) + 1) });
                    })
                } else {
                    res.json({ status: 200, message: "Success", data: data });
                }
            });
        }

    });

    //Get the details of the celebrity with the celebrity name
    app.get('/celebrity-by-name/:name', VerifyToken, function (req, res) {
        Celebrities.find({ celebrityName: req.params.name }, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data.length > 0) {
                var result = data[0]
                result.createdDateTime = moment(data[0].createdDateTime).format('YYYY-MM-DD hh:mm:ss A');
                result.updatedDateTime = moment(data[0].updatedDateTime).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: [result] });
            } else {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });

    //To Update the Celebrity Details based on the id
    app.put('/celebrity/:id', VerifyToken, function (req, res) {
        Celebrities.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, contest) {
            if (err)
                res.send(err);
            else {
                var result = contest.toObject()
                result.createdDateTime = moment.tz(contest.createdDateTime, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                result.updatedDateTime = moment.tz(contest.updatedDateTime, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: contest });
            }
        });
    });

    //Fetch only the Celebrity list by Subcategory
    app.get('/celebrity-by-subcategory/:subcategoryId', VerifyToken, function (req, res) {
        Celebrities.aggregate(
            { $match: { subCategoryId: {$in: [ObjectId(req.params.subcategoryId)]} } },
            { $project: { _id: 0, celebrityName: 1, "insensitive": { "$toLower": "$celebrityName" } } }, { $sort: { insensitive: 1 } }, function (err, data) {
                if (err)
                    res.send(err)
                else if (data)
                    res.json({ status: 200, message: "Success", data: data })
            })
    })

    //To get the celebrity details by subcategory and pagination number
    app.get('/celebrity-details-by-subcategory/:subCatId/:number', VerifyToken, function (req, res) {
        Celebrities.find(
            { subCategoryId: { $in: [ObjectId(req.params.subCatId)] } }).skip(parseInt(req.params.number - 1) * 12).limit(12).sort({ "celebrityName": 1 }).exec(function (err, data) {
                if (err)
                    res.send(err)
                else if (data) {
                    Celebrities.find(
                        { subCategoryId: { $in: [ObjectId(req.params.subCatId)] } }).count().exec(function (err, count) {
                            res.json({ status: 200, message: "Success", data: data, totalNumOfPages: (count % 12) == 0 ? parseInt((count / 12)) : parseInt((count / 12) + 1) })
                        })
                }
            })
    })

    //To get the celebrtiy names by Category Id
    app.get('/celebrity-by-category/:categoryId', VerifyToken, function (req, res) {
        Celebrities.aggregate(
            {$match: {"categoryId" : ObjectId(req.params.categoryId)}},
            {$project: {_id: 0,celebrityName: 1,"insensitive": { "$toLower": "$celebrityName" }}},
            {$sort: {"insensitive": 1}}, function (err, data) {
                if (err)
                    res.send(err)
                else if (data)
                    res.json({ status: 200, message: "Success", data: data })
            })
    })
}