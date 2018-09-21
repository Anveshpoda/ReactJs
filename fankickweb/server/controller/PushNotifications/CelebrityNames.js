var CelebrityNames=require('../../models/PushNotifications/CelebrityNames');
var ObjectId = require('mongodb').ObjectID

module.exports = function(app){
    app.get('/celebrityNames',function(req,res){
        CelebrityNames.aggregate([
            { $match: { subCategoryId: ObjectId(req.query.subCatId) } },
            { $project: { celebrityName: 1, _id: 0 } }, { $group: { _id: null, celebrityNames: { $push: "$celebrityName" } } }
        ], function (err, data) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            }
            if (data) {
                res.json({ status: 200, message: "Success", data: data[0].celebrityNames });
            }
        })
    })
}