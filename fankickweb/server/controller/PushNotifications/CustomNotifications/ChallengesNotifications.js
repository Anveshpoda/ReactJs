var MessageCenter = require('../../../models/contests');
const moment = require('moment-timezone');
var UserFining = require('../ServicesForCronJob');
var VerifyToken=require('../../../security/TokenVerification');

module.exports = function (app) {
    app.post('/likesCount',VerifyToken, function (req, res) {
        var input = req.body;
        UserFining.challengesLikesCount(input.likes, input.category, input.date, input.range, input.fromLikes, input.toLikes).then((result) => {
            if (result) {
                res.json({ status: 200, message: "Success", data: result.list });
            }
        })
    })
    app.post('/likesCountRange',VerifyToken, function (req, res) {
        var input=req.body;
        UserFining.challengesLikesCountRange(input.likes,input.category,input.startDate,input.endDate,input.range,input.fromLikes,input.toLikes).then((result)=>{
            if(result){
                res.json({status:200,message:"Success",data:result.list})
            }
        })
    })
    app.post('/participatedCount',VerifyToken, function (req, res) {
        var input = req.body;
        UserFining.challengesParticipatedCount(input.range,input.date,input.count,input.fromCount,input.toCount,input.category).then((result)=>{
            if(result){
                res.json({status:200,message:"Success",data:result.list})
            }
        })
    })
    app.post('/participatedCountRange',VerifyToken, function (req, res) {
        var input = req.body;
        UserFining.challengesParticipatedCountRange(input.range,input.startDate,input.endDate,input.count,input.fromCount,input.toCount,input.category).then((result)=>{
            if(result){
                res.json({status:200,message:"Success",data:result.list})
            }
        })
    })
    app.post('/participated',VerifyToken, function (req, res) {
        var input = req.body;
        UserFining.challengesParticipated(input.date,input.category).then((result)=>{
             if(result){
                res.json({status:200,message:"Success",data:result.list})
            }
        })
    })
    app.post('/participatedRange',VerifyToken, function (req, res) {
        var input = req.body;
        UserFining.challengesParticipatedRange(input.startDate,input.endDate,input.category).then((result)=>{
             if(result){
                res.json({status:200,message:"Success",data:result.list})
            }
        })
    })
}