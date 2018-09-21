var Locations = require('../models/contestlocations');
var Roles = require('../models/roles');
var VerifyToken = require('../security/TokenVerification');
const moment = require('moment-timezone');

module.exports = function (app) {
    app.post('/location', VerifyToken, function (req, res) {
        var input = req.body;
        const location = new Locations(input);
        location.save((saveErr) => {
            if (saveErr) {
                res.json({ status: 404, message: "Failure", data: saveErr });
            } else {
                var result = location.toObject()
                result.createdAt = moment(location.createdAt).format('YYYY-MM-DD hh:mm:ss A');
                result.updatedAt = moment(location.updatedAt).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: result });
            }
        });
    });
    app.post('/role', function (req, res) {
        var input = req.body;
        const role = new Roles(input);
        role.save((saveErr) => {
            if (saveErr) {
                res.json({ status: 404, message: "Failure", data: saveErr });
            } else {
                var result = role.toObject()
                res.json({ status: 200, message: "Success", data: result });
            }
        });
    });
    app.get('/roleslist', VerifyToken, function (req, res) {
        Roles.find({}, function (err, result) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            } else {
                console.log("resultroles", result);
                res.json({ status: 200, message: "Success", data: result });
            }
        })
    })
}