var FunClubs = require('../models/FunClubs');
var FunClubJokes = require('../models/FunClubJokes');
var VerifyToken = require('../security/TokenVerification');


module.exports = function (app) {
    //To get the FunClubNames 
    app.get('/getFunClubNames', VerifyToken, function (req, res) {
        FunClubs.find({}, function (err, funClubs) {
            res.json({ status: 200, message: "Success", data: funClubs });
        })
    });

    //To get All the FunClubs and Associated Jokes
    app.get('/getAllFunClubJokes', VerifyToken, function (req, res) {
        FunClubs.aggregate([{
            $lookup:
                {
                    from: "FunClubJokes",
                    localField: "_id",
                    foreignField: "funClubId",
                    as: "jokes"
                }
        }, {
            $sort: {
                "jokes.createdDate": -1
            }
        }, {
            "$project": {
                jokes: 1,
                funClubName: 1,
                funClubImageUrl:1
            }
        }], function (err, funClubJokes) {
            if (err)
                res.json({ status: 404, message: "Failure", data: err });
            else
                res.json({ status: 200, message: "Success", data: funClubJokes })
        })

    });

    //To get the Funclub by id
    app.get('/getFunClubsInfo/:id', VerifyToken, function (req, res) {
        FunClubJokes.find({ funClubId: req.params.id }).sort({ "createdDate": -1 }).exec(function (err, funClubs) {
            res.json({ status: 200, message: "Success", data: funClubs });
        })
    });

    //To get the FunClub Joke By Id
    app.get('/getJokesById/:id', VerifyToken, function (req, res) {
        FunClubJokes.find({ _id: req.params.id }, function (err, funClubJokes) {
            res.json({ status: 200, message: "Success", data: funClubJokes });
        })
    });

    //To Create a FunClub Joke
    app.post('/FunClubJoke', VerifyToken, function (req, res) {
        const fclubJokes = new FunClubJokes(req.body)
        fclubJokes.save((saveErr) => {
            if (saveErr) {
                res.json({ status: 404, message: "Failure", data: saveErr });
            } else {
                var result = fclubJokes.toObject();
                res.json({ status: 200, message: "Success", data: result });
            }
        });
    });

    //To Create a FunClub
    app.post('/FunClub', VerifyToken, function (req, res) {
        const fclub = new FunClubs(req.body)
       // console.log("adfadf",req.body);
        fclub.save((saveErr) => {
            if (saveErr) {
                res.json({ status: 404, message: "Failure", data: saveErr });
            } else {
                var result = fclub.toObject();
                res.json({ status: 200, message: "Success", data: result });
            }
        });
    });

    //To update the FunClub details based on the id
    app.put('/FunClub/:id', VerifyToken, function (req, res) {
        var input = req.body;
        FunClubs.findOneAndUpdate({ _id: req.params.id }, input, { new: true }, function (err, data) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: data });
        });
    });

    //To update the FuncLub joke based on the id.
    app.put('/FunClubJoke/:id', VerifyToken, function (req, res) {
        var input = req.body;
        FunClubJokes.findOneAndUpdate({ _id: req.params.id }, input, { new: true }, function (err, data) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: data });
        });
    });
}