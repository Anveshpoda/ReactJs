var Locations = require('../models/StateNames');
var VerifyToken = require('../security/TokenVerification');

module.exports = function (app) {
    app.get('/locationNames', VerifyToken, (req, res) => {
        Locations.find({}).exec((err, data) => {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err })
            } else {
                var result = [];
                for (let i of data) {
                    result.push(i.location)
                }
                res.json({ status: 200, message: "Success", data: result })
            }
        })
    })
}