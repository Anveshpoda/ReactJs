var VerifyToken = require('../../security/TokenVerification');
var UserFining = require('./ServicesForCronJob');


module.exports = function (app) {
    app.post('/joinedFanclub',VerifyToken, function (req, res) {
        var input = req.body;
        UserFining.joinedFanclub(input.catId, input.subCatId, input.celebrityName, input.date, input.startDate, input.endDate, input.performed).then((result) => {
            if (result) {
               // console.log("catId",input.catId,"subCatId",input.subCatId,"date",input.date)
               // console.log("result",result.list)
                res.json({ status: 200, message: "Success", data: result.list })
            }
        })
    })
    app.post('/fanclubCount',VerifyToken, function (req, res) {
        var input = req.body;
        UserFining.fanclubCount(input.range, input.count, input.startCount, input.endCount, input.date, input.startDate, input.endDate, input.catId, input.subCatId).then((result) => {
            if (result) {
                res.json({ status: 200, message: "Success", data: result.list })
            }
        })
    })
    app.post('/createFanclub',VerifyToken, function (req, res) {
        var input = req.body;
        UserFining.createFanclub(input.catId, input.subCatId, input.celebrityName, input.date, input.startDate, input.endDate, input.performed).then((result) => {
            if (result) {
                res.json({ status: 200, message: "Success", data: result.list })
            }
        })
    })
    app.post('/createFanclubCount',VerifyToken, function (req, res) {
        var input = req.body;
        UserFining.createFanclubCount(input.catId, input.subCatId, input.count, input.startCount, input.endCount, input.date, input.startDate, input.endDate, input.range).then((result) => {
            if (result) {
                res.json({ status: 200, message: "Success", data: result.list })
            }
        })
    })
    app.post('/memberCount',VerifyToken, function (req, res) {
        var input = req.body;
        UserFining.fanclubMemberCount(input.catId, input.subCatId, input.count, input.startCount, input.endCount, input.date, input.startDate, input.endDate, input.range).then((result) => {
            if (result) {
                res.json({ status: 200, message: "Success", data: result.list })
            }
        })
    })
    app.post('/fanclubFeed',VerifyToken, function (req, res) {
        var input = req.body;
        UserFining.fanclubFeed(input.catId, input.subCatId, input.date, input.startDate, input.endDate).then((result) => {
            if (result) {
                res.json({ status: 200, message: "Success", data: result.list })
            }
        })
    })
    app.post('/createEvent',VerifyToken, function (req, res) {
        var input=req.body;
        UserFining.createEvent(input.catId,input.subCatId,input.date,input.startDate,input.endDate).then((result)=>{
            if (result) {
                res.json({ status: 200, message: "Success", data: result.list })
            }
        })
    })
    app.post('/createEventCount',VerifyToken, function (req, res) {
         var input=req.body;
         UserFining.createEventCount(input.catId,input.subCatId,input.range,input.date,input.startDate,input.endDate,input.count,input.startCount,input.endCount).then((result)=>{
              if (result) {
                res.json({ status: 200, message: "Success", data: result.list })
            }
         })
     })
}