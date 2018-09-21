var Categories = require('../models/categories');
var VerifyToken = require('../security/TokenVerification');

module.exports = function (app) {
    app.get('/categories', VerifyToken, function (req, res) {
        Categories.find({}, function (err, categories) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: categories });
        });
    });
}