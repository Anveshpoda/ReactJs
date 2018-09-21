var KeyWords = require('../models/KeyWords');
var VerifyToken = require('../security/TokenVerification');
var sentiment = require('sentiment');
var WordsList = require('../AfinnWordsList');
var Feeds = require('../models/Feeds');
var Sentiment = new sentiment();

module.exports = function (app) {
    app.get('/keywords', VerifyToken, (req, res) => {
        KeyWords.find({}, (err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            else {
                console.log("result", Sentiment.analyze('sorry'))
                // console.log("stateJson", stateJson, "revivedClassifier", revivedClassifier);
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })

    app.get('/feedCategories', VerifyToken, (req, res) => {
        Feeds.find({ type: "text", isDeleted: false }, { description: 1, createdUser: 1, createdDateTime: 1, fanClubId: 1 }, (err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            else {
                // console.log("data",data)
                var result = [];
                for (let i of data) {
                    var obj = {};
                    var userData = []
                    var a = Sentiment.analyze(i.description);
                    // if (req.params.key === "abusive") {
                    //     if (a.score <= req.params.val1) {
                    //         obj._id = i._id;
                    //         obj.description = i.description;
                    //         obj.score = a.score;
                    //         result.push(obj);
                    //     }
                    // } else if (req.params.key === "Normal") {
                    //     if (a.score >= req.params.val1) {
                    //         obj._id = i._id;
                    //         obj.description = i.description;
                    //         obj.score = a.score;
                    //         result.push(obj);
                    //     }
                    // } else {
                    //     if (a.score >= req.params.val1 && a.score <= req.params.val2) {
                    userData.push(i.createdUser);
                    obj._id = i._id;
                    obj.feedData = i.description;
                    obj.userData = userData;
                    obj.createdDate = i.createdDateTime;
                    obj.fanClubName=i.fanClubId.name;
                    obj.score = a.score;
                    result.push(obj);
                    // }
                }
                res.json({ status: 200, message: "Success", data: result });
            }

            // }
        })
    })
}