var NotificationSubCategory = require('../../models/PushNotifications/NotificationSubCategoryWeb');

module.exports = function (app) {
    app.get('/notificationSubCategory', function (req, res) {
        if (req.query.sTypeId) {
            NotificationSubCategory.find({ sTypeId: req.query.sTypeId }, function (err, data) {
                if (err) {
                    res.json({ status: 404, message: "Failure", data: err })
                } else {
                    res.json({ status: 200, message: "Success", data: data  });
                }
            })
        }
        else if (req.query.cTypeId) {
            NotificationSubCategory.find({ cTypeId: req.query.cTypeId }, function (err, data) {
                if (err) {
                    res.json({ status: 404, message: "Failure", data: err })
                } else {
                    res.json({ status: 200, message: "Success", data: data });
                }
            })
        }
    })
}