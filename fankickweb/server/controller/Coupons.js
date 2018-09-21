var CouponsInfo = require('../models/couponsinfo');
var UserProperties = require('../models/userProperties');
var DataAnalytics = require('../models/DataAnalytics');
var CommercialCoupons = require('../models/commercialCoupons');
var FanCoins = require('../models/PushNotifications/FanCoins');
var UserProfile = require('../models/UserProfile');
var VerifyToken = require('../security/TokenVerification');
var ObjectId = require('mongodb').ObjectID;
const moment = require('moment-timezone');
const moments = require('moment');
var Excel = require('exceljs');
var fs = require('fs');
var _ = require('lodash');
var DateUtils = require('../dateutil');


function search(data) {
    var arr = [];
    var len = [];
    var Ids = [];
    var a = 1;
    var type = data[0].couponFrom;
    for (var i = 0; i < data.length; i++) {
        var obj = {
            cost: data[i].couponCost,
            coins: data[i].fanCoins
        }
        Ids.push(obj)
    }
    Ids = Ids.filter((Ids, index, self) =>
        index === self.findIndex((t) => (
            t.cost === Ids.cost && t.coins === Ids.coins
        ))
    )
    for (var i = 0; i < Ids.length; i++) {
        for (var j = 0; j < data.length; j++) {
            if (Ids[i].cost === data[j].couponCost && Ids[i].coins === data[j].fanCoins) {
                arr.push(data[j]);
            }
        }
        a = Ids[i].cost;
        var b = Ids[i].coins;
        arr.push(b)
        len.push({ [a]: arr });
        arr = [];
    }
    len = [...len, { type: type }]
    return len;
}

function uploadCoupons(dataArr, i) {
    var g = String(Object.keys(dataArr[i]));
    var f = dataArr[i][g];
    // console.log("couponFrom",String(dataArr[dataArr.length - 1].type))
    // console.log("couponCost",Number(Object.keys(dataArr[i])))
    // console.log("couponCost",Number(f[f.length - 1]))
    CouponsInfo.find({ couponFrom: String(dataArr[dataArr.length - 1].type), couponCost: Number(Object.keys(dataArr[i])), fanCoins: Number(f[f.length - 1]) }, function (err, data) {
        if (data && data.length != 0) {
            var couponsArr = [];
            var arr = dataArr[i][Object.keys(dataArr[i])];
            arr.splice(-1, 1)
            for (var j = 0; j < arr.length; j++) {
                var obj = arr[j]; var image = obj.couponImageUrl; var icon = obj.couponIcon; var value = obj.valueType;
                delete obj.couponType;
                delete obj.couponFrom;
                delete obj.couponDescription;
                delete obj.couponCost;
                delete obj.fanCoins;
                delete obj.couponImageUrl;
                delete obj.couponIcon;
                delete obj.type;
                delete obj.limit;
                delete obj.valueType;
                delete obj.termsAndConditions;
                couponsArr = data[0].couponsData;
                couponsArr.push(obj);
            }
            data[0].couponsData = couponsArr;
            data[0].couponImageUrl = image;
            data[0].couponIcon = icon;
            data[0].couponImage = icon;
            data[0].valueType = value;
            data[0].save((err) => {
                if (err) {
                    console.log('Error', err)
                } else {
                }
            })
        }
        else {
            var arr = dataArr[i][Object.keys(dataArr[i])];
            arr.splice(-1, 1);

            // console.log('oninon', arr[0].valueType)
            var postData = {
                "couponFrom": arr[0].couponFrom,
                "couponDescription": arr[0].couponDescription,
                "couponCost": arr[0].couponCost,
                "fanCoins": arr[0].fanCoins,
                "couponType": arr[0].couponType,
                "couponImageUrl": arr[0].couponImageUrl,
                "couponIcon": arr[0].couponIcon,
                "couponImage": arr[0].couponIcon,
                "valueType": arr[0].valueType,
                "termsAndConditions": arr[0].termsAndConditions,
                "type": arr[0].type,
                "limit": arr[0].limit,
                "brandAndroidUrl": "",
                "brandIosUrl": "",
                "brandWebUrl": ""
            }
            var couponsArr = [];
            for (var k = 0; k < arr.length; k++) {
                var obj = arr[k];
                delete obj.couponType;
                delete obj.couponFrom;
                delete obj.couponDescription;
                delete obj.couponCost;
                delete obj.fanCoins;
                delete obj.couponImageUrl;
                delete obj.couponIcon;
                delete obj.valueType;
                delete obj.type;
                delete obj.limit;
                delete obj.termsAndConditions;
                couponsArr.push(obj);
            }
            postData.couponsData = couponsArr;
            // console.log("postData",postData)
            var newCoupon = new CouponsInfo(postData);
            newCoupon.save((saveErr) => {
                if (saveErr) {
                } else {
                    var result = newCoupon.toObject()
                    result.createdAt = moment(newCoupon.createdAt).format('YYYY-MM-DD hh:mm:ss A');
                    result.updatedAt = moment(newCoupon.updatedAt).format('YYYY-MM-DD hh:mm:ss A');
                }
            });
        }
    })
}

module.exports = function (app) {

    //Coupons Basic Info
    app.post('/coupon', VerifyToken, function (req, res) {
        var input = req.body;
        const couponsInfo = new CouponsInfo(input);
        couponsInfo.save((saveErr) => {
            if (saveErr) {
                res.json({ status: 404, message: "Failure", data: saveErr });
            } else {
                var result = couponsInfo.toObject()
                result.createdAt = moment(couponsInfo.createdAt).format('YYYY-MM-DD hh:mm:ss A');
                result.updatedAt = moment(couponsInfo.updatedAt).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: result });
            }
        });
    });


    app.get('/coupon/:id', VerifyToken, function (req, res) {
        CouponsInfo.findById(req.params.id, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                var object = data.toObject();
                delete object.couponsData;
                object.createdAt = moment(data.createdAt).format('YYYY-MM-DD hh:mm:ss A');
                object.updatedAt = moment(data.updatedAt).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: object });
            } else {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });
    //Get the avaialable coupon types
    app.get('/coupon-types', VerifyToken, function (req, res) {
        CouponsInfo.find({}, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                var result = [];
                for (var i = 0; i < data.length; i++) {
                    var object = data[i].toObject();
                    delete object.couponsData;
                    object.createdAt = moment(data[i].createdAt).format('YYYY-MM-DD hh:mm:ss A');
                    object.updatedAt = moment(data[i].updatedAt).format('YYYY-MM-DD hh:mm:ss A');
                    result.push(object)
                }
                res.json({ status: 200, message: "Success", data: result });
            } else {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });
    //To get all the coupons with pagignation number
    //Not in use
    app.get('/coupons/:number', VerifyToken, function (req, res) {
        CouponsInfo.aggregate([{ $unwind: '$couponsData' }, {
            $sort: {
                "couponsData.couponBeginDate": -1
            }
        },
        {
            $skip: parseInt(12 * (+req.params.number - 1))
        },
        {
            $limit: parseInt(12)
        }], function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                var result = [];
                for (var i = 0; i < data.length; i++) {
                    var object = data[i];
                    object.couponCode = object.couponsData.couponCode
                    object.pin = object.couponsData.pin
                    object.couponStatus = object.couponsData.couponStatus
                    object.imageWithCode = object.couponsData.imageWithCode
                    object.userId = object.couponsData.userId
                    object.couponBeginDate = moment.tz(object.couponsData.couponBeginDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A')
                    object.couponEndDate = moment.tz(object.couponsData.couponEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A')
                    object.redemptionDate = moment.tz(object.couponsData.redemptionDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A')
                    delete object.couponsData
                    result.push(object)
                }
                CouponsInfo.aggregate([{ $unwind: '$couponsData' }, {
                    $sort: {
                        "couponsData.couponBeginDate": -1
                    }
                }
                ], function (err, coupons) {
                    res.json({ status: 200, message: "Success", data: result, numofPages: (coupons.length % 12 == 0) ? parseInt(coupons.length / 12) : parseInt((coupons.length / 12) + 1), length: coupons.length });
                })
            } else {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });

    app.put('/coupon/:id', VerifyToken, function (req, res) {
        CouponsInfo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, contest) {
            if (err)
                res.send(err);
            var result = contest.toObject()
            result.createdAt = moment.tz(contest.createdAt, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
            result.updatedAt = moment.tz(contest.updatedAt, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
            res.json({ status: 200, message: "Success", data: result });
        });
    });

    //Coupon Cards
    // app.put('/couponCard/:type/:cost', VerifyToken, function (req, res) {
    //     var input = req.body;
    //     CouponsInfo.findOneAndUpdate({ couponFrom: req.params.type, couponCost:req.params.cost}, { $push: { couponsData: input.cardData } },
    //         { safe: true, upsert: true }, function (err, model) {
    //             if (err) {
    //                 res.json({ status: 404, message: "Failure", data: err });
    //             } else {
    //                 res.json({ status: 200, message: "Successfully Uploaded." });
    //             }
    //         }
    //     );
    // });


    app.put('/couponCard/:type/:cost', VerifyToken, function (req, res) {
        var input = req.body;
        CouponsInfo.find({ couponFrom: req.params.type, couponCost: req.params.cost }, function (err, model) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err });
            } else {
                var result = model[0]
                result.couponsData.push(input)
                result.save((err) => {
                    if (err) {

                    } else {

                    }
                })
                res.json({ status: 200, message: "Successfully Uploaded.", data: result });
            }
        }
        );
    });

    // app.get('/couponcost/:type', VerifyToken, function(req,res){
    //     CouponsInfo.findById({couponFrom: req.params.type}, function(err,data){
    //         if(err){
    //             res.send(err);
    //         } else if(data){
    //             var result = {};
    //             for(i=0; i < data.length;i++){

    //             }
    //         }
    //     })
    // })


    app.get('/couponcost/:type', VerifyToken, function (req, res) {
        CouponsInfo.aggregate([{ $match: { couponFrom: req.params.type } }, { $group: { _id: "$couponCost" } }], function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                res.json({ status: 2000, message: "Success", data: data });
            }
        });
    });

    app.get('/editCouponBrand', VerifyToken, (req, res) => {
        CouponsInfo.find({ couponCost: req.query.couponCost, fanCoins: req.query.fanCoins, couponFrom: req.query.couponFrom }, (err, data) => {
            if (err) {
                res.send(err);
            } else if (data) {
                res.json({ status: 2000, message: "Success", data: data });
            }
        })
    })

    app.get('/coupon/:id/:cardId', VerifyToken, function (req, res) {
        CouponsInfo.findById(req.params.id, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                var result = {};
                for (var i = 0; i < data.couponsData.length; i++) {
                    if (String(data.couponsData[i]._id) === req.params.cardId) {
                        result = data.couponsData[i].toObject();
                        result.couponBeginDate = moment.tz(data.couponsData[i].couponBeginDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                        result.couponEndDate = moment.tz(data.couponsData[i].couponEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                        result.redemptionDate = moment.tz(data.couponsData[i].redemptionDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                        break;
                    }
                }
                res.json({ status: 200, message: "Success", data: result });
            } else {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });
    //Not in Use
    //To get the coupon info based on the Coupon Type Id and Coupon Card Id
    // app.get('/coupon1/:id/:cardId', VerifyToken, function (req, res) {
    //     CouponsInfo.aggregate([{$unwind: '$couponsData'}, {$match: {"couponsData._id": ObjectId(req.params.cardId), "_id": ObjectId(req.params.id)}}], function (err, data) {
    //         if (err) {
    //             res.send(err);
    //         } else if (data) {
    //             res.json({ status: 2000, message: "Success", data: data });
    //         }
    //     });
    // });

    app.put('/coupon/:id/:cardId', VerifyToken, function (req, res) {
        CouponsInfo.findById(req.params.id, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                var result = {};
                for (var i = 0; i < data.couponsData.length; i++) {
                    if (String(data.couponsData[i]._id) === req.params.cardId) {
                        data.couponsData[i] = req.body.cardData;
                        break;
                    }
                }
                data.save((saveErr) => {
                    if (saveErr) {
                        res.json({ status: 404, message: "Failure", data: saveErr });
                    } else {
                        res.json({ status: 200, message: "Successfully updated." });
                    }
                });
            } else {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });
    //Get All Coupons with pagignation number
    app.get('/all-coupons/:number', VerifyToken, function (req, res) {
        CouponsInfo.find({}, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                var result = [];
                for (var k = 0; k < data.length; k++) {
                    for (var i = 0; i < data[k].couponsData.length; i++) {
                        var object = data[k].couponsData[i].toObject();
                        object.couponFrom = data[k].couponFrom;
                        object.couponDescription = data[k].couponDescription;
                        object.couponCost = data[k].couponCost;
                        object.fanCoins = data[k].fanCoins;
                        object.couponType = data[k].couponType;
                        object.couponImageUrl = data[k].couponImageUrl;
                        object.couponIcon = data[k].couponIcon;
                        object.couponImage = data[k].couponImage;
                        object.termsAndConditions = data[k].termsAndConditions;
                        object.couponInfoId = data[k]._id;
                        object.couponBeginDate = moment.tz(data[k].couponsData[i].couponBeginDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                        object.couponEndDate = moment.tz(data[k].couponsData[i].couponEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                        object.redemptionDate = moment.tz(data[k].couponsData[i].redemptionDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                        result.push(object);
                    }
                }
                var results = result.slice(parseInt(12 * (+req.params.number - 1)), parseInt(12 * (+req.params.number)))
                res.json({ status: 200, message: "Success", data: results, numofPages: (result.length % 12 == 0) ? parseInt(result.length / 12) : parseInt((result.length / 12) + 1) });
            } else {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });

    //Get All Coupons by Type and Pagignation Number
    app.get('/all-coupons/:type/page/:number', VerifyToken, function (req, res) {
        CouponsInfo.find({ couponFrom: req.params.type }, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                var result = [];
                for (var k = 0; k < data.length; k++) {
                    for (var i = 0; i < data[k].couponsData.length; i++) {
                        var object = data[k].couponsData[i].toObject();
                        object.couponFrom = data[k].couponFrom;
                        object.couponDescription = data[k].couponDescription;
                        object.couponCost = data[k].couponCost;
                        object.fanCoins = data[k].fanCoins;
                        object.couponType = data[k].couponType;
                        object.couponImageUrl = data[k].couponImageUrl;
                        object.couponIcon = data[k].couponIcon;
                        object.couponImage = data[k].couponImage;
                        object.termsAndConditions = data[k].termsAndConditions;
                        object.couponInfoId = data[k]._id;
                        object.couponBeginDate = moment.tz(data[k].couponsData[i].couponBeginDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                        object.couponEndDate = moment.tz(data[k].couponsData[i].couponEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                        object.redemptionDate = moment.tz(data[k].couponsData[i].redemptionDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                        result.push(object);
                    }
                }
                var results = result.slice(parseInt(12 * (+req.params.number - 1)), parseInt(12 * (+req.params.number)))
                res.json({ status: 200, message: "Success", data: results, numofPages: (result.length % 12 == 0) ? parseInt(result.length / 12) : parseInt((result.length / 12) + 1) });
            } else {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });

    // app.get('/available-coupons/:type/page/:number', VerifyToken, function (req, res) {
    //     CouponsInfo.find({ couponFrom: req.params.type }, function (err, data) {
    //         if (err) {
    //             res.send(err);
    //         } else if (data) {
    //             var result = [];
    //             for (var k = 0; k < data.length; k++) {
    //                 for (var i = 0; i < data[k].couponsData.length; i++) {
    //                     if (data[k].couponsData[i].couponStatus) {
    //                         var object = data[k].couponsData[i].toObject();
    //                         object.couponFrom = data[k].couponFrom;
    //                         object.couponDescription = data[k].couponDescription;
    //                         object.couponCost = data[k].couponCost;
    //                         object.fanCoins = data[k].fanCoins;
    //                         object.couponType = data[k].couponType;
    //                         object.couponImageUrl = data[k].couponImageUrl;
    //                         object.couponIcon = data[k].couponIcon;
    //                         object.couponImage = data[k].couponImage;
    //                         object.termsAndConditions = data[k].termsAndConditions;
    //                         object.couponInfoId = data[k]._id;
    //                         object.couponBeginDate = moment.tz(data[k].couponsData[i].couponBeginDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
    //                         object.couponEndDate = moment.tz(data[k].couponsData[i].couponEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
    //                         object.redemptionDate = moment.tz(data[k].couponsData[i].redemptionDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
    //                         result.push(object);
    //                     }
    //                 }
    //             }
    //             var results = result.slice(parseInt(12 * (+req.params.number - 1)), parseInt(12 * (+req.params.number)))
    //             res.json({ status: 200, message: "Success", data: results, numofPages: (result.length % 12 == 0) ? parseInt(result.length / 12) : parseInt((result.length / 12) + 1) });
    //         } else {
    //             res.json({ status: 200, message: "Success", data: data });
    //         }
    //     });
    // });

    app.get('/available-coupons/:type', VerifyToken, function (req, res) {
        CouponsInfo.find({ couponFrom: req.params.type }, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                var result = [];
                for (var k = 0; k < data.length; k++) {
                    for (var i = 0; i < data[k].couponsData.length; i++) {
                        if (data[k].couponsData[i].couponStatus) {
                            var object = data[k].couponsData[i].toObject();
                            object.couponFrom = data[k].couponFrom;
                            object.couponDescription = data[k].couponDescription;
                            object.couponCost = data[k].couponCost;
                            object.fanCoins = data[k].fanCoins;
                            object.couponType = data[k].couponType;
                            object.couponImageUrl = data[k].couponImageUrl;
                            object.couponIcon = data[k].couponIcon;
                            object.couponImage = data[k].couponImage;
                            object.termsAndConditions = data[k].termsAndConditions;
                            object.couponInfoId = data[k]._id;
                            object.couponBeginDate = moment.tz(data[k].couponsData[i].couponBeginDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                            object.couponEndDate = moment.tz(data[k].couponsData[i].couponEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                            object.redemptionDate = moment.tz(data[k].couponsData[i].redemptionDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                            result.push(object);
                        }
                    }
                }
                var results = result;
                res.json({ status: 200, message: "Success", data: results });
            } else {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });


    // app.get('/redeemed-coupons/:type/page/:number', VerifyToken, function (req, res) {
    //     CouponsInfo.find({ couponFrom: req.params.type }, function (err, data) {
    //         if (err) {
    //             res.send(err);
    //         } else if (data) {
    //             var result = [];
    //             for (var k = 0; k < data.length; k++) {
    //                 for (var i = 0; i < data[k].couponsData.length; i++) {
    //                     if (!data[k].couponsData[i].couponStatus) {
    //                         var object = data[k].couponsData[i].toObject();
    //                         object.couponFrom = data[k].couponFrom;
    //                         object.couponDescription = data[k].couponDescription;
    //                         object.couponCost = data[k].couponCost;
    //                         object.fanCoins = data[k].fanCoins;
    //                         object.couponType = data[k].couponType;
    //                         object.couponImageUrl = data[k].couponImageUrl;
    //                         object.couponIcon = data[k].couponIcon;
    //                         object.couponImage = data[k].couponImage;
    //                         object.termsAndConditions = data[k].termsAndConditions;
    //                         object.couponInfoId = data[k]._id;
    //                         object.couponBeginDate = moment.tz(data[k].couponsData[i].couponBeginDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
    //                         object.couponEndDate = moment.tz(data[k].couponsData[i].couponEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
    //                         object.redemptionDate = moment.tz(data[k].couponsData[i].redemptionDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
    //                         result.push(object);
    //                     }
    //                 }
    //             }
    //             var results = result.slice(parseInt(12 * (+req.params.number - 1)), parseInt(12 * (+req.params.number)))
    //             res.json({ status: 200, message: "Success", data: results, numofPages: (result.length % 12 == 0) ? parseInt(result.length / 12) : parseInt((result.length / 12) + 1) });
    //         } else {
    //             res.json({ status: 200, message: "Success", data: data });
    //         }
    //     });
    // });

    app.get('/redeemed-coupons/:type', VerifyToken, function (req, res) {
        CouponsInfo.find({ couponFrom: req.params.type }, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                var result = [];
                for (var k = 0; k < data.length; k++) {
                    for (var i = 0; i < data[k].couponsData.length; i++) {
                        if (!data[k].couponsData[i].couponStatus) {
                            var object = data[k].couponsData[i].toObject();
                            object.couponFrom = data[k].couponFrom;
                            object.couponDescription = data[k].couponDescription;
                            object.couponCost = data[k].couponCost;
                            object.fanCoins = data[k].fanCoins;
                            object.couponType = data[k].couponType;
                            object.couponImageUrl = data[k].couponImageUrl;
                            object.couponIcon = data[k].couponIcon;
                            object.couponImage = data[k].couponImage;
                            object.termsAndConditions = data[k].termsAndConditions;
                            object.couponInfoId = data[k]._id;
                            object.couponBeginDate = moment.tz(data[k].couponsData[i].couponBeginDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                            object.couponEndDate = moment.tz(data[k].couponsData[i].couponEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                            object.redemptionDate = moment.tz(data[k].couponsData[i].redemptionDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                            result.push(object);
                        }
                    }
                }
                var results = result;
                res.json({ status: 200, message: "Success", data: results });
            } else {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });


    //To get the available coupons with pagignation number
    app.get('/available/:number', VerifyToken, function (req, res) {
        // CouponsInfo.find({}).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).exec(function (err, data) {
        CouponsInfo.find({}, function (err, data) {
            if (err) {
                res.json({ status: 404, message: "Failure" });
            } else if (data) {
                var result = [];
                for (var k = 0; k < data.length; k++) {
                    for (var i = 0; i < data[k].couponsData.length; i++) {
                        if (data[k].couponsData[i].couponStatus) {
                            var object = data[k].couponsData[i].toObject();
                            object.couponFrom = data[k].couponFrom;
                            object.couponDescription = data[k].couponDescription;
                            object.couponCost = data[k].couponCost;
                            object.fanCoins = data[k].fanCoins;
                            object.couponType = data[k].couponType;
                            object.couponImageUrl = data[k].couponImageUrl;
                            object.couponIcon = data[k].couponIcon;
                            object.couponImage = data[k].couponImage;
                            object.termsAndConditions = data[k].termsAndConditions;
                            object.couponInfoId = data[k]._id;
                            object.couponBeginDate = moment.tz(data[k].couponsData[i].couponBeginDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                            object.couponEndDate = moment.tz(data[k].couponsData[i].couponEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                            object.redemptionDate = moment.tz(data[k].couponsData[i].redemptionDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                            result.push(object);
                        }
                    }
                }
                var results = result.slice(parseInt(12 * (+req.params.number - 1)), parseInt(12 * (+req.params.number)))
                res.json({ status: 200, message: "Success", data: results, numofPages: (result.length % 12 == 0) ? parseInt(result.length / 12) : parseInt((result.length / 12) + 1) });
            } else {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });

    //To get the redeemed coupons with pagignation number
    app.get('/redeemed/:number', VerifyToken, function (req, res) {
        // CouponsInfo.find({}).skip(parseInt(12 * (+req.params.number - 1))).limit(parseInt(12)).exec(function (err, data) {
        CouponsInfo.find({}, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data) {
                var result = [];
                for (var k = 0; k < data.length; k++) {
                    for (var i = 0; i < data[k].couponsData.length; i++) {
                        if (!data[k].couponsData[i].couponStatus) {
                            var object = data[k].couponsData[i].toObject();
                            object.couponFrom = data[k].couponFrom;
                            object.couponDescription = data[k].couponDescription;
                            object.couponCost = data[k].couponCost;
                            object.fanCoins = data[k].fanCoins;
                            object.couponType = data[k].couponType;
                            object.couponImageUrl = data[k].couponImageUrl;
                            object.couponIcon = data[k].couponIcon;
                            object.couponImage = data[k].couponImage;
                            object.termsAndConditions = data[k].termsAndConditions;
                            object.couponInfoId = data[k]._id;
                            object.couponBeginDate = moment.tz(data[k].couponsData[i].couponBeginDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                            object.couponEndDate = moment.tz(data[k].couponsData[i].couponEndDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                            object.redemptionDate = moment.tz(data[k].couponsData[i].redemptionDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                            result.push(object);
                        }
                    }
                }
                var results = result.slice(parseInt(12 * (+req.params.number - 1)), parseInt(12 * (+req.params.number)))
                res.json({ status: 200, message: "Success", data: results, numofPages: (result.length % 12 == 0) ? parseInt(result.length / 12) : parseInt((result.length / 12) + 1) });
            } else {
                res.json({ status: 200, message: "Success", data: data });
            }
        });
    });

    //To get the coupons based on the redemption status
    app.get('/coupons-by-status/:status', VerifyToken, function (req, res) {
        var status;
        if (req.params.status == 'available') status = true
        else if (req.params.status == 'redeemed') status = false
        CouponsInfo.aggregate([{ $unwind: '$couponsData' }, { $match: { "couponsData.couponStatus": status } }, {
            $sort: {
                "couponsData.couponBeginDate": -1
            }
        }], function (err, data) {
            if (err)
                res.send(err)
            else
                res.json({ status: 200, message: "Success", data: data });
        })
    })


    /*Coupons Bulk Upload*/
    app.post('/uploadCoupons', VerifyToken, function (req, res) {
        var file = req.files.file;
        if (file) {
            var arr = [];
            CouponsInfo.aggregate({ $project: { 'couponFrom': 1, '_id': 0 } }, function (err, data) {
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        arr.push(data[i].couponFrom)
                    }
                }
                arr = _.uniq(arr);
                var bytes = file.data;
                fs.writeFile(file.name, bytes, (err) => {
                    if (err) throw err;
                    var eWorkbook = new Excel.Workbook();
                    eWorkbook.xlsx.readFile(file.name)
                        .then(function () {
                            var eWorksheet = eWorkbook.getWorksheet(1);
                            if (eWorksheet.actualColumnCount != 0) {
                                var result = [];
                                var errors = {};
                                var finalArr = [];
                                var newRecords = [];
                                var newArr = {};
                                var obj = {};
                                if (arr.length != 0) {
                                    // console.log("arr", arr)
                                    for (var j = 0; j < arr.length; j++) {
                                        eWorksheet.eachRow({}, function (row, rowNumber) {
                                            if (rowNumber == 1)
                                                return;
                                            var coupon = {};
                                            if (!row.getCell(1).value || !row.getCell(2).value ||
                                                !row.getCell(3).value || !row.getCell(4).value ||
                                                !row.getCell(5).value || !row.getCell(8).value ||
                                                !row.getCell(9).value || !row.getCell(10).value ||
                                                !row.getCell(11).value || !row.getCell(12).value ||
                                                !row.getCell(13).value || !row.getCell(14).value || (!row.getCell(6).value && !row.getCell(7).value)) {
                                                errors.err = "Please fill all the fields";
                                            }
                                            //var a = arr[j].charAt(0).toUpperCase() + arr[j].slice(1);
                                            if (//row.getCell(2).value === arr[j].toLowerCase() || row.getCell(2).value === arr[j].toUpperCase()
                                                row.getCell(2).value === arr[j]) {
                                                coupon.couponCode = row.getCell(6).value;
                                                if (row.getCell(7).value) {
                                                    coupon.pin = row.getCell(7).value;
                                                } else {
                                                    coupon.pin = "";
                                                }
                                                coupon.couponStatus = true;
                                                coupon.couponBeginDate = DateUtils.convert(row.getCell(8).value);
                                                coupon.couponEndDate = DateUtils.convert(row.getCell(9).value);
                                                coupon.valueType = row.getCell(10).value;
                                                coupon.type = row.getCell(11).value;
                                                // console.log(coupon.valueType, 'Thpe', row.getCell(10).value,'44')
                                                coupon.limit = row.getCell(12).value;
                                                coupon.couponType = row.getCell(1).value;
                                                coupon.couponFrom = arr[j];
                                                coupon.couponDescription = row.getCell(3).value;
                                                coupon.couponCost = row.getCell(4).value;
                                                coupon.fanCoins = row.getCell(5).value;
                                                coupon.couponImageUrl = row.getCell(13).value.hyperlink ? row.getCell(13).value.hyperlink : row.getCell(13).value;
                                                coupon.couponIcon = row.getCell(14).value.hyperlink ? row.getCell(14).value.hyperlink : row.getCell(14).value;
                                                coupon.couponImage = row.getCell(14).value.hyperlink ? row.getCell(14).value.hyperlink : row.getCell(14).value;
                                                //  coupon.termsAndConditions = row.getCell(14).value;
                                                result.push(coupon);
                                            }
                                        })
                                        // console.log("data",result)
                                        if (Object.keys(errors).length === 0) {
                                            if (result.length != 0) {
                                                result = search(result);
                                                // console.log("result", result)
                                                for (var l = 0; l < (result.length - 1); l++) {
                                                    uploadCoupons(result, l);
                                                }
                                            }
                                        }
                                        obj[arr[j]] = result;
                                        finalArr.push(obj);
                                        obj = {};
                                        result = [];
                                    }
                                }
                                var keysArr = [];
                                eWorksheet.eachRow({}, function (row, rowNumber) {
                                    if (rowNumber == 1)
                                        return;
                                    var coupon = {};
                                    if (!row.getCell(1).value || !row.getCell(2).value ||
                                        !row.getCell(3).value || !row.getCell(4).value ||
                                        !row.getCell(5).value || !row.getCell(8).value ||
                                        !row.getCell(9).value || !row.getCell(10).value ||
                                        !row.getCell(11).value || !row.getCell(12).value ||
                                        !row.getCell(13).value || !row.getCell(14).value || (!row.getCell(6).value && !row.getCell(7).value)) {
                                        errors.err = "Please fill all the fields";
                                    }
                                    var b = row.getCell(2).value;
                                    if (b) {
                                        //var a = b.charAt(0).toUpperCase() + b.slice(1);
                                        if (//!arr.includes(b.toLowerCase()) && !arr.includes(b.toUpperCase()) && !arr.includes(a) && 
                                            !arr.includes(b)) {
                                            coupon.couponCode = row.getCell(6).value;
                                            if (row.getCell(7).value) {
                                                coupon.pin = row.getCell(7).value;
                                            } else {
                                                coupon.pin = "";
                                            }
                                            coupon.couponStatus = true;
                                            coupon.couponBeginDate = DateUtils.convert(row.getCell(8).value);
                                            coupon.couponEndDate = DateUtils.convert(row.getCell(9).value);
                                            coupon.valueType = row.getCell(10).value;
                                            // console.log(coupon.valueType, 'Thpe', row.getCell(10).value,'44')
                                            coupon.type = row.getCell(11).value;
                                            coupon.limit = row.getCell(12).value;
                                            coupon.couponType = row.getCell(1).value;
                                            coupon.couponFrom = row.getCell(2).value;
                                            coupon.couponDescription = row.getCell(3).value;
                                            coupon.couponCost = row.getCell(4).value;
                                            coupon.fanCoins = row.getCell(5).value;
                                            coupon.couponImageUrl = row.getCell(13).value.hyperlink ? row.getCell(13).value.hyperlink : row.getCell(13).value;
                                            coupon.couponIcon = row.getCell(14).value.hyperlink ? row.getCell(14).value.hyperlink : row.getCell(14).value;
                                            coupon.couponImage = row.getCell(14).value.hyperlink ? row.getCell(14).value.hyperlink : row.getCell(14).value;
                                            //  coupon.termsAndConditions = row.getCell(14).value;
                                            //console.log("coupon",coupon);
                                            newRecords.push(coupon)
                                            if (!Object.keys(newArr).includes(row.getCell(2).value)) {
                                                newArr[row.getCell(2).value] = newRecords;
                                                newRecords = [];
                                            } else {
                                                newArr[row.getCell(2).value].push(coupon);
                                            }
                                            coupon = {};
                                            newRecords = [];
                                        }
                                    }
                                })
                                // console.log("new",newArr,errors)
                                if (Object.keys(errors).length === 0) {
                                    if (Object.keys(newArr).length != 0) {
                                        var a = Object.keys(newArr);
                                        for (var i = 0; i < a.length; i++) {
                                            newArr[a[i]] = search(newArr[a[i]]);
                                            //  console.log("newArr",newArr[a[i]])
                                            var c = Object.keys(newArr[a[i]]);
                                            // console.log("ccc",c)
                                            for (var b = 0; b < (newArr[a[i]].length - 1); b++) {
                                                uploadCoupons(newArr[a[i]], b);
                                            }
                                        }
                                    }
                                }
                                if (Object.keys(errors).length === 0) {
                                    res.json({ status: 200, message: "Coupons uploaded Successfully" })
                                } else {
                                    res.json({ status: 500, message: errors.err })
                                }
                                fs.unlinkSync(file.name)
                            } else {
                                res.json({ status: 404, message: "Empty excel cannot be uploaded" })
                                fs.unlinkSync(file.name)
                            }
                        });
                })
            })
        }
    })


    /*Total coupons redeemed between dates*/
    app.post('/couponsRedeemed', VerifyToken, function (req, res) {
        var arr = [];
        CouponsInfo.aggregate({ $project: { 'couponFrom': 1, '_id': 0, "couponsData": 1 } }, function (err, data) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err })
            }
            if (data) {
                var coupontypes = req.body.coupontype;
                if (coupontypes.length) {
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < coupontypes.length; j++) {
                            if (coupontypes[j] == data[i].couponFrom) { arr.push(data[i].couponFrom) }
                        }
                    }
                } else {
                    for (var i = 0; i < data.length; i++) {
                        arr.push(data[i].couponFrom)
                    }

                }
                arr = _.uniq(arr);
                var input = req.body;
                var fromDate = input.fromDate;
                var toDate = input.toDate;
                var dates = [];
                var result = [];
                fromDate = moment(fromDate).format('YYYY-MM-DD');
                toDate = moment(toDate).format("YYYY-MM-DD");
                var currentDate = fromDate;
                while (currentDate <= toDate) {
                    dates.push(currentDate);
                    currentDate = moment(currentDate).add(1, 'day').format('YYYY-MM-DD');
                }
                var count = 0;
                var total = 0;
                var users = [];
                var date = "";
                var obj = {};
                var sum = 0;
                var totalCountArr = []
                for (var k = 0; k < dates.length; k++) {
                    obj.date = dates[k];
                    for (var l = 0; l < arr.length; l++) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].couponFrom === arr[l]) {
                                if (data[i].couponsData.length != 0) {
                                    for (var j = 0; j < data[i].couponsData.length; j++) {
                                        if (data[i].couponsData[j].redemptionDate) {
                                            var createdDate = moment(data[i].couponsData[j].redemptionDate).format('YYYY-MM-DD');
                                            if (createdDate === dates[k]) {
                                                count = count + 1;
                                                total = total + 1;
                                                users.push(data[i].couponsData[j].userId);
                                            }
                                        }
                                    }
                                }
                            }
                            obj[arr[l]] = String(count);
                        }
                        count = 0;
                    }
                    users = users.map(String);
                    users = _.uniq(users);
                    obj.users = String(users.length);
                    obj.totalCoupons = String(total);
                    sum += parseInt(total)
                    result.push(obj);
                    obj = {};
                    users = [];
                    total = 0;
                }
                // console.log(sum, 'totalCountArr')
                res.json({ status: 200, message: "Success", data: result, keys: Object.keys(result[0]), totalCount: sum })
            }
        })
    })

    /*Total Coupons redeemed till date*/
    app.get('/couponsRedeemedTillDate', VerifyToken, function (req, res) {
        CouponsInfo.find({}, function (err, data) {
            if (err) {
                res.json({ status: 404, message: "Failure", data: err })
            } else if (data) {
                var arr = [];
                for (var i = 0; i < data.length; i++) {
                    arr.push(data[i].couponFrom)
                }
                arr = _.uniq(arr);
                var count = 0;
                var total = 0;
                var users = [];
                var result = [];
                var obj = {};
                for (var k = 0; k < arr.length; k++) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].couponFrom === arr[k]) {
                            if (data[i].couponsData.length != 0) {
                                for (var j = 0; j < data[i].couponsData.length; j++) {
                                    if (data[i].couponsData[j].redemptionDate) {
                                        count = count + 1;
                                        total = total + 1;
                                        users.push(data[i].couponsData[j].userId);
                                    }
                                }
                            }
                            obj.imageUrl = data[i].couponImageUrl;
                        }
                        obj.couponType = arr[k];
                        obj.coinsCount = count;
                    }
                    result.push(obj);
                    obj = {};
                    count = 0;
                }
                users = users.map(String);
                users = _.uniq(users);
                obj.users = users.length;
                obj.totalCoupons = total;
                obj.couponsCount = result;
                res.json({ status: 200, message: "Success", data: obj })
            }
        })
    })

    function userDetails(ids) {
        var userPromise = new Promise((resolve, reject) => {
            UserProfile.aggregate([
                { $match: { _id: { $in: ids } } },
                { $project: { _id: 0, userId: "$_id", username: "$fullName", mobileNumber: "$mobileNumber", location: "$location" } }
            ], (err1, userData) => {
                if (err1) reject(err1)
                if (userData) {
                    //res.json({ status: 200, message: "Success", data: userData })
                    resolve(userData);
                }
            })
        })
        return userPromise;
    }

    function dataAnal(ids) {
        var userPromise = new Promise((resolve, reject) => {
            DataAnalytics.aggregate([
                { $match: { "userId": { $in: ids } } },
                { $group: { _id: "$userId", ipAddresses: { $push: "$ipAddress" } } },
                { $project: { userId: "$_id", _id: 0, ipAddresses: 1 } }
            ], function (err1, data1) {
                if (err1) reject(err1)
                if (data1) {
                    for (let i of data1) {
                        i.ipAddresses = _.uniq(i.ipAddresses);
                    }
                    //res.json({ status: 200, message: "Success", data: userData })
                    resolve(data1);
                }
            })
        })
        return userPromise;
    }
    function userProp(ids) {
        var userPromise = new Promise((resolve, reject) => {
            UserProperties.aggregate([
                { $match: { 'userId': { '$in': ids } } },
                { $project: { _id: 0, userId: 1, deviceId: "$deviceInfo.anIdOrUId" } }
            ], function (err1, data1) {
                if (err1) reject(err1)
                if (data1) {
                    //res.json({ status: 200, message: "Success", data: userData })
                    resolve(data1);
                }
            })
        })
        return userPromise;
    }
    function userCoins(ids) {
        var userPromise = new Promise((resolve, reject) => {
            FanCoins.aggregate([
                { $match: { 'userId': { '$in': ids } } },
                { $group: { _id: '$userId', count: { $sum: { $add: ["$coins"] } } } },
                { $project: { userId: "$_id", currentFancoins: "$count", _id: 0 } }
            ], function (err1, data1) {
                if (err1) reject(err1)
                if (data1) {
                    //res.json({ status: 200, message: "Success", data: userData })
                    resolve(data1);
                }
            })
        })
        return userPromise;
    }

    /*Coupons redeemed userwise between dates */
    app.post('/couponsRedeemedUserwise', VerifyToken, function (req, res) {
        var input = req.body;
        var fromDate = input.fromDate;
        var toDate = input.toDate;
        var result = [];
        CouponsInfo.aggregate([
            { $match: { "couponsData.redemptionDate": { $gte: new Date(fromDate), $lte: new Date(toDate) } } },
            {
                $project: {
                    _id: 0, "fancoinsRedeemed": "$fanCoins", "couponValue": "$couponCost", "couponType": "$couponFrom",
                    "users": {
                        $filter: {
                            input: "$couponsData", as: "coupon",
                            cond: { $and: [{ $gte: ["$$coupon.redemptionDate", new Date(fromDate)] }, { $lte: ["$$coupon.redemptionDate", new Date(toDate)] }] }
                        }
                    }
                }
            },
            { $unwind: "$users" },
            //{ $lookup: { from: 'UserProfile', localField: "users.userId", foreignField: "_id", as: "userInfo" } }, { $unwind: "$userInfo" },
            //{ $lookup: { from: "UserProperties", localField: "users.userId", foreignField: "userId", as: "device" } }, { $unwind: "$device" },
            //{$lookup:{from:"DataAnalytics",localField:"users.userId",foreignField:"userId",as:"ipAdd"}},//,{$unwind:"$ipAdd"},
            //{$lookup:{from:"FanCoins",localField:"users.userId",foreignField:"userId",as:"current"}},
            {
                $project: {
                    fancoinsRedeemed: 1, couponValue: 1, couponType: 1, "date": { $dateToString: { format: "%Y-%m-%d", date: "$users.redemptionDate" } },
                    userId: "$users.userId"
                    //userId: "$userInfo._id", username: "$userInfo.fullName", mobileNumber: "$userInfo.mobileNumber", location: "$userInfo.location",
                    //deviceId: "$device.deviceInfo.anIdOrUId"
                }
            },
            //{$project:{"fancoins":{$sum:"$currentFancoins"},fancoinsRedeemed:1,couponValue:1,couponType:1,date:1,userId:1,username:1,  mobileNumber:1,location:1,deviceId:1,ipAddresses:1}}

        ], function (err, data) {
            if (data) {
                var ids = [];
                for (let i of data) {
                    ids.push(i.userId);
                }
                ids = _.uniq(ids);
                Promise.all([
                    userDetails(ids),
                    userProp(ids),
                    userCoins(ids),
                    dataAnal(ids)
                ]).then((result) => {
                    for (let i of data) {
                        for (let j = 0; j < result[0].length; j++) {
                            if (String(i.userId) === String(result[0][j].userId)) {
                                i.username = result[0][j].username; i.mobileNumber = result[0][j].mobileNumber;
                                i.location = result[0][j].location;
                            }
                            if (result[2].length > j) {
                                if (String(i.userId) === String(result[2][j].userId)) {
                                    i.currentFancoins = result[2][j].currentFancoins;
                                }
                            }
                            if (result[1].length > j) {
                                if (String(i.userId) === String(result[1][j].userId)) {
                                    i.deviceId = result[1][j].deviceId;
                                }
                            }
                        }
                        for (let k of result[3]) {
                            if (String(i.userId) === String(k.userId)) {
                                i.ipAddresses = k.ipAddresses;
                            }
                        }
                    }
                    res.json({ status: 200, message: "Success", data: data })
                }).catch((err) => {
                    console.log("err", err)
                })
                // DataAnalytics.aggregate([
                //     { $match: { "userId": { $in: ids } } },
                //     { $group: { _id: "$userId", ipAddresses: { $push: "$ipAddress" } } }
                // ], function (err1, data1) {
                //     for (let i of data) {
                //         for (let j of data1) {
                //             if (String(i.userId) === String(j._id)) {
                //                i.ipAddresses=_.uniq(j.ipAddresses);
                //             }
                //         }
                //     }
                //     FanCoins.aggregate([{ $match: { 'userId': { '$in': ids } } }, { $group: { _id: '$userId', count: { $sum: { $add: ["$coins"] } } } }], function (err, fancoinsData) {
                //         if (fancoinsData) {
                //             for (let i of data) {
                //                 for (let j of fancoinsData) {
                //                     if (String(i.userId) === String(j._id)) {
                //                         i.currentFancoins = j.count;
                //                     }
                //                 }
                //             }
                //             res.json({ status: 200, message: "Success", data: data, keys: Object.keys(data[0]) })
                //         }
                //     })
                //     // res.json({ status: 200, message: "Success", data: data,data1:data1 })
                // })
                // for (let i of data) {
                //     i.ipAddresses = _.uniq(i.ipAddresses)
                // }

            }
        })
        // CouponsInfo.aggregate([
        //     { $project: { 'couponFrom': 1, '_id': 0, "couponsData": 1, "fanCoins": 1, "couponCost": 1 } }
        // ], function (err, data) {
        //     if (err) {
        //         res.json({ status: 404, message: "Failure", data: err })
        //     } else if (data) {
        //         var dates = [];
        //         fromDate = moment(fromDate).format('YYYY-MM-DD');
        //         toDate = moment(toDate).format("YYYY-MM-DD");
        //         var currentDate = fromDate;
        //         while (currentDate <= toDate) {
        //             dates.push(currentDate);
        //             currentDate = moment(currentDate).add(1, 'day').format('YYYY-MM-DD');
        //         }
        //         var count = 0;
        //         var total = 0;
        //         var deviceId = [];
        //         var date = "";
        //         for (var k = 0; k < dates.length; k++) {
        //             for (var i = 0; i < data.length; i++) {
        //                 var obj = {}; var users = [];
        //                 for (var j = 0; j < data[i].couponsData.length; j++) {
        //                     if (data[i].couponsData[j].redemptionDate) {
        //                         var redemDate = moment(data[i].couponsData[j].redemptionDate).format('YYYY-MM-DD');
        //                         if (redemDate === dates[k]) {
        //                             users.push(data[i].couponsData[j].userId);
        //                             obj.fancoinsRedeemed = data[i].fanCoins;
        //                             obj.couponValue = data[i].couponCost;
        //                             obj.couponType = data[i].couponFrom;
        //                         }
        //                     }
        //                 }
        //                 if (Object.keys(obj).length != 0) {
        //                     obj.date = dates[k];
        //                     users = users.map(String);
        //                     users = _.uniq(users);
        //                     obj.users = users;
        //                     result.push(obj);
        //                 }
        //             }
        //         }
        //         var newArr = [];
        //         if (result.length != 0) {
        //             for (var i = 0; i < result.length; i++) {
        //                 if (result[i].users.length != 0) {
        //                     for (var j = 0; j < result[i].users.length; j++) {
        //                         newArr.push(result[i].users[j]);
        //                     }
        //                 }
        //             }
        //         }
        //         var arr = [];
        //         if (newArr.length != 0) {
        //             UserProperties.find({ 'userId': { '$in': newArr } }, function (err, data) {
        //                 if (data) {
        //                     for (var j = 0; j < data.length; j++) {
        //                         for (var k = 0; k < result.length; k++) {
        //                             var a = result[k];
        //                             if (a.users.includes(String(data[j].userId._id))) {
        //                                 obj.date = a.date;
        //                                 obj.fancoinsRedeemed = a.fancoinsRedeemed;
        //                                 obj.couponValue = a.couponValue;
        //                                 obj.couponType = a.couponType;
        //                                 obj.userId = data[j].userId._id;
        //                                 obj.username = data[j].userId.fullName;
        //                                 obj.mobileNumber = data[j].userId.mobileNumber;
        //                                 obj.location = data[j].userId.location;
        //                                 obj.deviceId = data[j].deviceInfo.anIdOrUId;
        //                                 arr.push(obj);
        //                                 obj = {};
        //                             }
        //                         }
        //                     }
        //                     DataAnalytics.find({ 'userId': { '$in': newArr } }, function (err, ipAddresses) {
        //                         if (ipAddresses) {
        //                             var someArr = [];
        //                             for (var j = 0; j < arr.length; j++) {
        //                                 for (var i = 0; i < ipAddresses.length; i++) {
        //                                     if (String(arr[j].userId) === String(ipAddresses[i].userId)) {
        //                                         if (!someArr.includes(ipAddresses[i].ipAddress)) {
        //                                             someArr.push(ipAddresses[i].ipAddress);
        //                                         }
        //                                     }
        //                                 }
        //                                 arr[j].ipAddresses = someArr;
        //                                 someArr = [];
        //                             }
        //                             var arrList = [];
        //                             for (var l = 0; l < newArr.length; l++) {
        //                                 arrList.push(ObjectId(newArr[l]))
        //                             }
        //                             FanCoins.aggregate([{ $match: { 'userId': { '$in': arrList } } }, { $group: { _id: '$userId', count: { $sum: { $add: ["$coins"] } } } }], function (err, fancoinsData) {
        //                                 if (fancoinsData) {
        //                                     for (var i = 0; i < fancoinsData.length; i++) {
        //                                         for (var j = 0; j < arr.length; j++) {
        //                                             if (String(arr[j].userId) === String(fancoinsData[i]._id)) {
        //                                                 arr[j].currentFancoins = fancoinsData[i].count;
        //                                             }
        //                                         }
        //                                     }
        //                                     res.json({ status: 200, message: "Success", data: arr, keys: Object.keys(arr[0]) })
        //                                 }
        //                             })
        //                         }
        //                     })
        //                 }
        //             })
        //         } else {
        //             res.json({ status: 200, message: "No users Found" })
        //         }
        //     }
        // })
    })

    app.put('/editCouponImage/:name', VerifyToken, (req, res) => {
        var input = req.body.couponImage;
        CouponsInfo.find({ couponFrom: req.params.name }, (err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].couponImageUrl = input;
                    data[i].save((err1) => {

                    })
                }
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })

    app.get('/getAllAvailCoupons', VerifyToken, function (req, res) {
        CouponsInfo.find({}, function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                var couponTypes = [];
                var arr = [];
                var finalArr = [];
                for (var k = 0; k < data.length; k++) {
                    if (!couponTypes.includes(data[k].couponType)) {
                        couponTypes.push(data[k].couponType);
                    }
                    if (!arr.includes(data[k].couponFrom)) {
                        arr.push(data[k].couponFrom)
                    }
                }
                for (var j = 0; j < couponTypes.length; j++) {
                    var final = {}; var online = [];
                    for (var p = 0; p < arr.length; p++) {
                        var obj = {}; var couponsArr = []; var a = {};
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].couponType === couponTypes[j]) {
                                if (data[i].couponFrom === arr[p]) {
                                    obj.couponImageUrl = data[i].couponImageUrl;
                                    obj.type = arr[p];
                                    //couponCosts.push(data[i].couponCost); fanCoins.push(data[i].fanCoins);
                                    a[data[i].couponCost] = data[i].fanCoins;
                                    //console.log("couponType",data[i].couponFrom,"couponCost",data[i].couponCost)
                                    if (data[i].couponsData.length != 0) {
                                        for (var l = 0; l < data[i].couponsData.length; l++) {
                                            if (!data[i].couponsData[l].redemptionDate) {
                                                couponsArr.push(data[i].couponsData[l]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (couponsArr.length != 0) {
                            obj.totalCoupons = couponsArr.length;
                            couponsArr.sort(function (a, b) {
                                return new Date(b.couponEndDate).getTime() - new Date(a.couponEndDate).getTime();
                            })
                            obj.expiryStartDate = couponsArr[couponsArr.length - 1].couponEndDate;
                            obj.expiryEndDate = couponsArr[0].couponEndDate;
                            obj.couponCosts = a
                        }
                        if (obj["totalCoupons"]) {
                            online.push(obj);
                        }
                    }
                    if (online.length !== 0) {
                        final.couponType = couponTypes[j];
                        final.coupons = online;
                        finalArr.push(final);
                    }
                }
                res.json({ status: 200, message: "Success", data: finalArr })
            }
        })
    })
    app.get('/getAllRedeemCoupons', VerifyToken, function (req, res) {
        CouponsInfo.find({}, function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                var couponTypes = [];
                var arr = [];
                for (var k = 0; k < data.length; k++) {
                    if (!couponTypes.includes(data[k].couponType)) {
                        couponTypes.push(data[k].couponType);
                    }
                    if (!arr.includes(data[k].couponFrom)) {
                        arr.push(data[k].couponFrom)
                    }
                }
                var online = [];
                var obj = {};
                var couponsArr = [];
                var final = {};
                var finalArr = [];
                for (var j = 0; j < couponTypes.length; j++) {
                    for (var p = 0; p < arr.length; p++) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].couponType === couponTypes[j]) {
                                if (data[i].couponFrom === arr[p]) {
                                    obj.couponImageUrl = data[i].couponImageUrl;
                                    obj.type = arr[p];
                                    if (data[i].couponsData.length != 0) {
                                        for (var l = 0; l < data[i].couponsData.length; l++) {
                                            if (data[i].couponsData[l].redemptionDate) {
                                                couponsArr.push(data[i].couponsData[l]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (couponsArr.length != 0) {
                            obj.totalCoupons = couponsArr.length;
                        }
                        if (obj["totalCoupons"]) {
                            online.push(obj);
                        }
                        couponsArr = [];
                        obj = {};
                    }
                    if (online.length !== 0) {
                        final.couponType = couponTypes[j];
                        final.coupons = online;
                        finalArr.push(final);
                    }
                    final = {};
                    online = [];
                }
                res.json({ status: 200, message: "Success", data: finalArr })
            }
        })
    })

    app.get('/getDistinctCoupons', VerifyToken, (req, res) => {
        CouponsInfo.distinct("couponFrom").exec((err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })

    app.get('/commercialCouponList', VerifyToken, (req, res) => {
        CommercialCoupons.find({}).exec((err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                var result = [];
                for (let i of data) {
                    result.push(i.couponFrom);
                }
                result = _.uniq(result);
                res.json({ status: 200, message: "Success", data: result })
            }
        })
    })

    app.get('/commercialCost', VerifyToken, (req, res) => {
        CommercialCoupons.find({ "couponFrom": req.query.brandName }).exec((err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                var result = [];
                for (let i of data) {
                    result.push(i.couponCost);
                }
                result = _.uniq(result);
                res.json({ status: 200, message: "Success", data: result })
            }
        })
    })
}