var MovieCreative = require('../models/movieCreatives');
var VerifyToken = require('../security/TokenVerification');

module.exports = function (app) {

    //Create Movie Creatives
    app.post('/movie-creative', VerifyToken, function (req, res) {
        var input = req.body;
        const movieCreative = new MovieCreative(input);
        movieCreative.save((saveErr) => {
            if (saveErr) {
                res.json({ status: 404, message: "Failure", data: saveErr });
            } else {
                var result = movieCreative.toObject()
                res.json({ status: 200, message: "Success", data: result });
            }
        });
    });

    //Get Movie Creative By Id
    app.get('/movie-creative/:id', VerifyToken, function (req, res) {
        MovieCreative.findById(req.params.id, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                var result = data.toObject();
                res.json({ status: 200, message: "Success", data: result });
            } else {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });

    //To Get all the list of movie creatives
    app.get('/movie-creatives', VerifyToken, function (req, res) {
        MovieCreative.find({}).sort({"movieReleaseDate": -1}).exec(function (err, result) {
            if (err) {
                res.send(err);
            } else if (result.length) {
                res.json({ status: 200, message: "Success", data: result });
            } else {
                res.json({ status: 200, message: "Success", data: result });
            }
        });
    });



    //To Update the Celebrity Details based on the id
    app.put('/movie-creative/:id', VerifyToken, function (req, res) {
        MovieCreative.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, contest) {
            if (err)
                res.send(err);
            else if(contest.length) {
                res.json({ status: 200, message: "Success", data: contest });
            }
            else{
                res.json({ status: 200, message: "Success", data: contest })
            }
        });
    });


    //To delete the movie-creative based on the id 
    app.delete('/movie-creative/:id', VerifyToken, function (req, res) {
        MovieCreative.findByIdAndRemove({ _id: req.params.id }, function (err, contest) {
            if (err)
                res.send(err);
            else {
                res.json({ status: 200, message: "Success", data: contest });
            }
        });
    });
    }