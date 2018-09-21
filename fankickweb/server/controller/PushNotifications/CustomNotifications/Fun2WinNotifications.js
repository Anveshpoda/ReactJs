var Contentpacks = require('../../../models/contentpackmodel');
var UserProfile = require('../../../models/UserProfile');
var ObjectId = require('mongodb').ObjectID;
var _ = require('underscore');
var unique = require('array-unique');
var VerifyToken = require('../../../security/TokenVerification');
var difference = require('array-difference');


module.exports = function (app) {
    app.post('/fun2winNotification/participated', VerifyToken, (req, res) => {
        var input = req.body;
        var query = {};
        if (input.category != "" && input.subCategory != "") {
            query = {
                "categoryId": ObjectId(input.category),
                "subCategoryId": ObjectId(input.subCategory),
                'userActions.isAnswered': 1
            }
        } else if (input.category) {
            query = {
                "categoryId": ObjectId(input.category),
                'userActions.isAnswered': 1
            }
        } else {
            query = {
                'userActions.isAnswered': 1
            }
        }
        Contentpacks.aggregate([{ $unwind: '$userActions' },
        {
            $match: query
        },
        {
            $project: { _id: 0, 'userActions.userId': 1 }
        }], (err, data) => {
            if (err) {
                res.sendStatus(403)
            }
            else {
                var userIds = []
                data.forEach((x) => {
                    userIds.push(String(x.userActions.userId))
                })
                var uniqueUsers = _.uniq(userIds)
                res.json({ status: 200, message: "Success", data: uniqueUsers });
            }
        })
    })

    app.post('/fun2winNotification/notparticipated', VerifyToken, (req, res) => {
        var input = req.body;
        var query = {}; var userFilter = {};
        if (input.category != "" && input.subCategory != "") {
            query = {
                "categoryId": ObjectId(input.category),
                "subCategoryId": ObjectId(input.subCategory),
                'userActions.isAnswered': 1
            }
            userFilter = {
                "categories._id": ObjectId(catId),
                "categories.subCategories": ObjectId(subCatId)
            }
        } else if (input.category) {
            query = {
                "categoryId": ObjectId(input.category),
                'userActions.isAnswered': 1
            }
            userFilter = {
                "categories._id": ObjectId(catId)
            }
        } else {
            query = {
                'userActions.isAnswered': 1
            }
        }
        Contentpacks.aggregate([{ $unwind: '$userActions' },
        {
            $match: query
        },
        {
            $project: { _id: 0, 'userActions.userId': 1 }
        }], (err, data) => {
            if (err) {
                res.json({ status: 402, message: "Failure", data: err });
            }
            else {
                var userIds = []
                data.forEach((x) => {
                    userIds.push(x.userActions.userId)
                })
                UserProfile.aggregate([{
                    $match: userFilter
                },
                { $project: { _id: 1 } }], function (err, data1) {
                    if (err) {
                        res.json({ status: 402, message: "Failure", data: err });
                    }
                    else {
                        var users = []
                        var result = [];
                        for (var i = 0; i < data1.length; i++) {
                            users.push(data1[i]._id);
                        }
                        userIds = userIds.map(String);
                        userIds = unique(userIds);
                        users = users.map(String);
                        result = difference(users, userIds);
                        res.json({ status: 200, message: "Success", data: result });
                    }
                })
            }
        })
    })



    app.post('/fun2winNotification/participatedCount', VerifyToken, (req, res) => {
        var input = req.body;
        var query = {};
        if (input.category != "" && input.subCategory != "") {
            query = {
                "categoryId": ObjectId(input.category),
                "subCategoryId": ObjectId(input.subCategory),
                'userActions.isAnswered': 1
            }
        } else if (input.category) {
            query = {
                "categoryId": ObjectId(input.category),
                'userActions.isAnswered': 1
            }
        } else {
            query = {
                'userActions.isAnswered': 1
            }
        }
        Contentpacks.aggregate([{ $unwind: '$userActions' },
        {
            $match: query
        },
        {
            $project: { _id: 0, 'userActions.userId': 1 }
        }], (err, data) => {
            if (err) {
                res.json(err)
            }
            else {
                var userIds = [];
                var filteredUsers = [];
                var result = [];
                var counts = {};
                data.forEach((x) => {
                    userIds.push(x.userActions.userId)
                })
                for (var i = 0; i < userIds.length; i++) {
                    var num = userIds[i];
                    counts[num] = counts[num] ? counts[num] + 1 : 1;
                }
                var keys = Object.keys(counts);
                for (let k = 0; k < keys.length; k++) {
                    filteredUsers.push(keys[k]);
                }
                for (let i = 0; i < filteredUsers.length; i++) {
                    if (input.comparision === 'EqualsTo') {
                        if (counts[filteredUsers[i]] === input.count) {
                            result.push(filteredUsers[i]);
                        }
                    }
                    else if (input.comparision === 'GreaterThan') {
                        if (counts[filteredUsers[i]] > input.count) {
                            result.push(filteredUsers[i]);
                        }
                    }
                    else if (input.comparision === 'LessThan') {
                        if (counts[filteredUsers[i]] < input.count) {
                            result.push(filteredUsers[i]);
                        }
                    }
                    else if (input.comparision === 'WithinRange') {
                        if (counts[filteredUsers[i]] >= input.fromRange && counts[filteredUsers[i]] <= input.toRange) {
                            result.push(filteredUsers[i]);
                        }
                    }
                }
                res.json({ status: 200, message: "Success", data: result });
            }
        })
    })
}
