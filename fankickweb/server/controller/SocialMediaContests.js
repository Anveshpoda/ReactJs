var SocialMediaContests = require('../models/SocialMediaContests');
var VerifyToken = require('../security/TokenVerification');
var moment = require('moment-timezone');


module.exports = function (app) {
    app.post('/Socialmediacontest', VerifyToken, (req, res) => {
        var input = req.body;
        var data = new SocialMediaContests(input)
        data.save((err) => {
            if (err) res.json({ status: 404, message: "Failure", data: err });
            else {
                var obj = data.toObject();
                obj.createdDate = moment(data.createdDate).format('YYYY-MM-DD hh:mm:ss A');
                obj.updatedDate = moment(data.updatedDate).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: obj });
            }
        })

    });
    app.get('/Socialmediacontests/Completed/:number', VerifyToken, (req, res) => {

        SocialMediaContests.find({"contestEndDate":{$lt:new Date()}}).skip(parseInt(12 * (+req.params.number - 1)))
        .limit(parseInt(12)).sort({ contestEndDate: -1 }).exec(function (err, data) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            }
            var result = [];
            var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
            for (var i = 0; i < data.length; i++) {
                var object = data[i].toObject();
                object.contestStartDate = moment.tz(object.contestStartDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                object.contestEndDate = moment.tz(object.contestEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                    object.participantCount = data[i].shares.length;
                    result.push(object);

            }
            SocialMediaContests.count({"contestEndDate":{$lt:new Date()}}, function (err, c) {
                res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
            });
        })
    })
    app.get('/Socialmediacontests/Running/:number', VerifyToken, (req, res) => {

        SocialMediaContests.find({$and:[{"contestEndDate":{$gte:new Date()}} , {"contestStartDate":{$lte:new Date()}} ]}).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort({ createdDate: -1 }).exec(function (err, data) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            }
            var result = [];
            var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
            for  (var i = 0; i < data.length; i++) {
                var object = data[i].toObject();
                    object.participantCount = data[i].shares.length;
                    result.push(object);

            }
            SocialMediaContests.count({$and:[{"contestEndDate":{$gte:new Date()}} , {"contestStartDate":{$lte:new Date()}} ]}, function (err, c) {
                res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
            });
        })
    })
    app.get('/Socialmediacontests/Upcoming/:number', VerifyToken, (req, res) => {
        
        SocialMediaContests.find({$and:[{"contestStartDate":{$gt:new Date()}},{"contestEndDate":{$gt:new Date()}} ,
        {"isDeleted" : false} , {"contestStatus" : true }]}).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort({ createdDate: -1 }).exec(function (err, data) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            }
            var result = [];
            for (var i = 0; i < data.length; i++) {
                var object = data[i].toObject();
                    object.participantCount = data[i].shares.length;
                    result.push(object);
            
            }
            SocialMediaContests.count({$and:[{"contestStartDate":{$gt:new Date()}},{"contestEndDate":{$gt:new Date()}} , {"isDeleted" : false} , {"contestStatus" : true }]}, function (err, c) {
                res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
            });
        })
    })

    app.get('/Socialmediacontests/contests-by-subcat/:tab/:number', VerifyToken, (req, res) => {
        var query ;
        var query1;
        if (req.params.tab === "Completed") {
            query = {subCategoryId: req.query.subCatId  , "contestEndDate":{$lt:new Date()}}
            query1 = { contestEndDate: -1}
        }else if (req.params.tab === "Running"){
            query = {subCategoryId: req.query.subCatId , $and:[{"contestEndDate":{$gte:new Date()}} , {"contestStartDate":{$lte:new Date()}} ]}
            query1 = { createdDate: -1}
        }else if(req.params.tab === "Upcoming") {
            query =  {subCategoryId: req.query.subCatId , $and:[{"contestStartDate":{$gt:new Date()}},{"contestEndDate":{$gt:new Date()}} ,
            {"isDeleted" : false} , {"contestStatus" : true }] }
            query1 = { createdDate: -1}
        }

        SocialMediaContests.find(query).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort(query1).exec(function (err, data) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            }
            var result = [];
            var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
            for (var i = 0; i < data.length; i++) {
                var object = data[i].toObject();
                object.contestStartDate = moment.tz(object.contestStartDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                object.contestEndDate = moment.tz(object.contestEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                        object.participantCount = data[i].shares.length;
                        result.push(object);
            }
            SocialMediaContests.count(query, function (err, c) {
                res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
            });
        })
    })
    app.get('/Socialmediacontests/contests-by-celName/:tab/:number', VerifyToken, (req, res) => {
        var query ;
        var query1;
        if (req.params.tab === "Completed") {
            query = { celebrityName: req.query.celName  , "contestEndDate":{$lt:new Date()}}
            query1 = { contestEndDate: -1}
        }else if (req.params.tab === "Running"){
            query = { celebrityName: req.query.celName , $and:[{"contestEndDate":{$gte:new Date()}} , {"contestStartDate":{$lte:new Date()}} ]}
            query1 = { createdDate: -1}
        }else if(req.params.tab === "Upcoming") {
            query =  { celebrityName: req.query.celName , $and:[{"contestStartDate":{$gt:new Date()}},{"contestEndDate":{$gt:new Date()}} ,
            {"isDeleted" : false} , {"contestStatus" : true }] }
            query1 = { createdDate: -1}
        }

        SocialMediaContests.find(query).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).sort(query1).exec(function (err, data) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            }
            var result = [];
            var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
            for (var i = 0; i < data.length; i++) {
                var object = data[i].toObject();
                object.contestStartDate = moment.tz(object.contestStartDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                object.contestEndDate = moment.tz(object.contestEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                        object.participantCount = data[i].shares.length;
                        result.push(object);
            }
            SocialMediaContests.count(query, function (err, c) {
                res.json({ status: 200, message: "Success", data: result, numofPages: (c % 12 == 0) ? parseInt(c / 12) : parseInt((c / 12) + 1) });
            });
        })
    })
    app.get('/Socialmediacontest/:id', VerifyToken, (req, res) => {
        SocialMediaContests.findById(req.params.id, (err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.put('/EditSocialmediacontest/:id', VerifyToken, (req, res) => {
        var input = req.body;
        SocialMediaContests.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, data) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: data });
        });
    })

    app.get('/deleteSocialmediaContest/:id', VerifyToken, (req, res) => {
        SocialMediaContests.findOneAndUpdate({ _id: req.params.id },
            { $set: { "isDeleted": true, "contestStatus": false } }).exec((err, data) => {
                if (err) res.json({ status: 404, message: "Failure", data: err })
                if (data) {
                    res.json({ status: 200, message: "Success" })
                }
            })
    })

}