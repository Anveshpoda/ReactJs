var MessageCenter = require('../../models/contests');
const moment = require('moment-timezone');
var unique = require('array-unique');
var Fanclubs = require('../../models/FanClubs');
var ObjectId = require('mongodb').ObjectID;
var UserDetails = require('../../models/UserProfile');
var _ = require('lodash');
var DateUtil = require('../../dateutil');
var FanclubFeed = require('../../models/Feeds');
var FanclubEvents = require('../../models/Events');

function challengesLikesCount(likes, type, date, compare, fromLikes, toLikes, schedule, description, title, imageUrl, id) {
    var challengesPromise = new Promise((resolve, reject) => {
        var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
        var users = [];
        MessageCenter.find({}, function (err, data) {
            if (err) {
            } else if (data) {
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].feedDetails.length; j++) {
                        if (type != 'All') {
                            if (type === data[i].feedDetails[j].feedType) {
                                if (date != "") {
                                    date = moment.tz(new Date(date), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                    data[i].feedDetails[j].createdDate = moment.tz(data[i].feedDetails[j].createdDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                    if (new Date(data[i].feedDetails[j].createdDate).getTime() >= new Date(date).getTime() && new Date(data[i].feedDetails[j].createdDate).getTime() <= new Date(today).getTime()) {
                                        if (compare === 'Is equal to') {
                                            if (likes === data[i].feedDetails[j].likes.length) {
                                                users.push(data[i].feedDetails[j].userId);
                                            }
                                        }
                                        else if (compare === 'Is less than') {
                                            if (data[i].feedDetails[j].likes.length < likes) {
                                                users.push(data[i].feedDetails[j].userId);
                                            }
                                            // return users;
                                        } else if (compare === 'Is greater than') {
                                            if (data[i].feedDetails[j].likes.length > likes) {
                                                users.push(data[i].feedDetails[j].userId);
                                            }
                                        } else if (compare === 'withinRange') {
                                            if (data[i].feedDetails[j].likes.length >= fromLikes && data[i].feedDetails[j].likes.length <= toLikes) {
                                                users.push(data[i].feedDetails[j].userId);
                                            }
                                        }
                                    }
                                } else {
                                    if (compare === 'Is equal to') {
                                        if (likes === data[i].feedDetails[j].likes.length) {
                                            users.push(data[i].feedDetails[j].userId);
                                        }
                                    }
                                    else if (compare === 'Is less than') {
                                        if (data[i].feedDetails[j].likes.length < likes) {
                                            users.push(data[i].feedDetails[j].userId);
                                        }
                                    } else if (compare === 'Is greater than') {
                                        if (data[i].feedDetails[j].likes.length > likes) {
                                            users.push(data[i].feedDetails[j].userId);
                                        }
                                    } else if (compare === 'withinRange') {
                                        if (data[i].feedDetails[j].likes.length >= fromLikes && data[i].feedDetails[j].likes.length <= toLikes) {
                                            users.push(data[i].feedDetails[j].userId);
                                        }
                                    }
                                }
                            }
                        } else if (type === 'All') {
                            if (date != "") {
                                date = moment.tz(new Date(date), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                data[i].feedDetails[j].createdDate = moment.tz(data[i].feedDetails[j].createdDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                if (new Date(data[i].feedDetails[j].createdDate).getTime() >= new Date(date).getTime() && new Date(data[i].feedDetails[j].createdDate).getTime() <= new Date(today).getTime()) {
                                    if (compare === 'Is equal to') {
                                        if (likes === data[i].feedDetails[j].likes.length) {
                                            users.push(data[i].feedDetails[j].userId);
                                        }
                                    }
                                    else if (compare === 'Is less than') {
                                        if (data[i].feedDetails[j].likes.length < likes) {
                                            users.push(data[i].feedDetails[j].userId);
                                        }
                                    } else if (compare === 'Is greater than') {
                                        if (data[i].feedDetails[j].likes.length > likes) {
                                            users.push(data[i].feedDetails[j].userId);
                                        }
                                    } else if (compare === 'withinRange') {
                                        if (data[i].feedDetails[j].likes.length >= fromLikes && data[i].feedDetails[j].likes.length <= toLikes) {
                                            users.push(data[i].feedDetails[j].userId);
                                        }
                                    }
                                }
                            } else {
                                if (compare === 'Is equal to') {
                                    if (likes === data[i].feedDetails[j].likes.length) {
                                        users.push(data[i].feedDetails[j].userId);
                                    }
                                }
                                else if (compare === 'Is less than') {
                                    if (data[i].feedDetails[j].likes.length < likes) {
                                        users.push(data[i].feedDetails[j].userId);
                                    }
                                } else if (compare === 'Is greater than') {
                                    if (data[i].feedDetails[j].likes.length > likes) {
                                        users.push(data[i].feedDetails[j].userId);
                                    }
                                } else if (compare === 'withinRange') {
                                    if (data[i].feedDetails[j].likes.length >= fromLikes && data[i].feedDetails[j].likes.length <= toLikes) {
                                        users.push(data[i].feedDetails[j].userId);
                                    }
                                }
                            }
                        }
                    }
                }
                users = users.map(String);
                users = unique(users)
                resolve({ list: users, reqObj: { schedule, description, title, imageUrl, id } });
            }
        })
    })
    return challengesPromise;
}
function challengesCountRange(likes, type, date1, date2, compare, fromLikes, toLikes, schedule, description, title, imageUrl, id) {
    var challengesPromise = new Promise((resolve, reject) => {
        var users = [];
        MessageCenter.find({}, function (err, data) {
            if (err) {
                //res.json({status:404,message:"Failure",data:err});
            } else {
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].feedDetails.length; j++) {
                        if (type != 'All') {
                            if (type === data[i].feedDetails[j].feedType) {
                                if (date1 != "") {
                                    date1 = moment.tz(new Date(date1), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                    date2 = moment.tz(new Date(date2), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                    data[i].feedDetails[j].createdDate = moment.tz(data[i].feedDetails[j].createdDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                    if (new Date(data[i].feedDetails[j].createdDate).getTime() >= new Date(date2).getTime() && new Date(data[i].feedDetails[j].createdDate).getTime() <= new Date(date1).getTime()) {
                                        if (compare === 'Is equal to') {
                                            if (likes === data[i].feedDetails[j].likes.length) {
                                                users.push(data[i].feedDetails[j].userId);
                                            }
                                        }
                                        else if (compare === 'Is less than') {
                                            if (data[i].feedDetails[j].likes.length < likes) {
                                                users.push(data[i].feedDetails[j].userId);
                                            }
                                        } else if (compare === 'Is greater than') {
                                            if (data[i].feedDetails[j].likes.length > likes) {
                                                users.push(data[i].feedDetails[j].userId);
                                            }
                                        } else if (compare === 'withinRange') {
                                            if (data[i].feedDetails[j].likes.length >= fromLikes && data[i].feedDetails[j].likes.length <= toLikes) {
                                                users.push(data[i].feedDetails[j].userId);
                                            }
                                        }
                                    }
                                } else {
                                    if (compare === 'Is equal to') {
                                        if (likes === data[i].feedDetails[j].likes.length) {
                                            users.push(data[i].feedDetails[j].userId);
                                        }
                                    }
                                    else if (compare === 'Is less than') {
                                        if (data[i].feedDetails[j].likes.length < likes) {
                                            users.push(data[i].feedDetails[j].userId);
                                        }
                                    } else if (compare === 'Is greater than') {
                                        if (data[i].feedDetails[j].likes.length > likes) {
                                            users.push(data[i].feedDetails[j].userId);
                                        }
                                    } else if (compare === 'withinRange') {
                                        if (data[i].feedDetails[j].likes.length >= fromLikes && data[i].feedDetails[j].likes.length <= toLikes) {
                                            users.push(data[i].feedDetails[j].userId);
                                        }
                                    }
                                }
                            }
                        } else if (type === 'All') {
                            if (date1 != "") {
                                date1 = moment.tz(new Date(date1), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                date2 = moment.tz(new Date(date2), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                data[i].feedDetails[j].createdDate = moment.tz(data[i].feedDetails[j].createdDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                if (new Date(data[i].feedDetails[j].createdDate).getTime() >= new Date(date2).getTime() && new Date(data[i].feedDetails[j].createdDate).getTime() <= new Date(date1).getTime()) {
                                    if (compare === 'Is equal to') {
                                        if (likes === data[i].feedDetails[j].likes.length) {
                                            users.push(data[i].feedDetails[j].userId);
                                        }
                                    }
                                    else if (compare === 'Is less than') {
                                        if (data[i].feedDetails[j].likes.length < likes) {
                                            users.push(data[i].feedDetails[j].userId);
                                        }
                                    } else if (compare === 'Is greater than') {
                                        if (data[i].feedDetails[j].likes.length > likes) {
                                            users.push(data[i].feedDetails[j].userId);
                                        }
                                    } else if (compare === 'withinRange') {
                                        if (data[i].feedDetails[j].likes.length >= fromLikes && data[i].feedDetails[j].likes.length <= toLikes) {
                                            users.push(data[i].feedDetails[j].userId);
                                        }
                                    }
                                }
                            } else {
                                if (compare === 'Is equal to') {
                                    if (likes === data[i].feedDetails[j].likes.length) {
                                        users.push(data[i].feedDetails[j].userId);
                                    }
                                }
                                else if (compare === 'Is less than') {
                                    if (data[i].feedDetails[j].likes.length < likes) {
                                        users.push(data[i].feedDetails[j].userId);
                                    }
                                } else if (compare === 'Is greater than') {
                                    if (data[i].feedDetails[j].likes.length > likes) {
                                        users.push(data[i].feedDetails[j].userId);
                                    }
                                } else if (compare === 'withinRange') {
                                    if (data[i].feedDetails[j].likes.length >= fromLikes && data[i].feedDetails[j].likes.length <= toLikes) {
                                        users.push(data[i].feedDetails[j].userId);
                                    }
                                }
                            }
                        }
                    }
                }
                users = users.map(String);
                users = unique(users)
                resolve({ list: users, reqObj: { schedule, description, title, imageUrl, id } });
                //res.json({status:200,message:"Success",data:users});
            }
        })
    })
    return challengesPromise;
}
function challengesParticipatedCount(compare, date, count, fromCount, toCount, type, schedule, description, title, imageUrl, id) {
    var challengesPromise = new Promise((resolve, reject) => {
        var users = [];
        var filteredUsers = [];
        var result = [];
        var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
        MessageCenter.find({}, function (err, data) {
            if (err) {
                // res.json({status:404,message:"Failure",data:err});
            } else {
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].feedDetails.length; j++) {
                        if (type != "All") {
                            if (type === data[i].feedDetails[j].feedType) {
                                if (date != "") {
                                    date = moment.tz(new Date(date), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                    data[i].feedDetails[j].createdDate = moment.tz(data[i].feedDetails[j].createdDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                    if (new Date(data[i].feedDetails[j].createdDate).getTime() >= new Date(date).getTime() && new Date(data[i].feedDetails[j].createdDate).getTime() <= new Date(today).getTime()) {
                                        users.push(data[i].feedDetails[j].userId);
                                    }
                                } else {
                                    users.push(data[i].feedDetails[j].userId);
                                }
                            }
                        } else if (type === "All") {
                            if (date != "") {
                                date = moment.tz(new Date(date), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                data[i].feedDetails[j].createdDate = moment.tz(data[i].feedDetails[j].createdDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                if (new Date(data[i].feedDetails[j].createdDate).getTime() >= new Date(date).getTime() && new Date(data[i].feedDetails[j].createdDate).getTime() <= new Date(today).getTime()) {
                                    users.push(data[i].feedDetails[j].userId);
                                }
                            } else {
                                users.push(data[i].feedDetails[j].userId);
                            }
                        }
                    }
                }
                var counts = {};
                users.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
                //var obj=JSON.parse(counts);
                var keys = Object.keys(counts);
                for (var k = 0; k < keys.length; k++) {
                    filteredUsers.push(keys[k]);
                }
                for (var l = 0; l < filteredUsers.length; l++) {
                    if (compare === 'Is equal to') {
                        if (counts[filteredUsers[l]] === count) {
                            result.push(filteredUsers[l]);
                        }
                    }
                    else if (compare === 'Is less than') {
                        if (counts[filteredUsers[l]] < count) {
                            result.push(filteredUsers[l]);
                        }
                    } else if (compare === 'Is greater than') {
                        if (counts[filteredUsers[l]] > count) {
                            result.push(filteredUsers[l]);
                        }
                    } else if (compare === 'withinRange') {
                        if (counts[filteredUsers[l]] >= fromCount && counts[filteredUsers[l]] <= toCount) {
                            result.push(filteredUsers[l]);
                        }
                    }
                }
                //res.json({status:200,message:"Success",data:users});
                result = result.map(String);
                result = unique(result)
                resolve({ list: result, reqObj: { schedule, description, title, imageUrl, id } });
            }
        })
    })
    return challengesPromise;
}
function challengesParticipatedCountRange(compare, date1, date2, count, fromCount, toCount, type, schedule, description, title, imageUrl, id) {
    var challengesPromise = new Promise((resolve, reject) => {
        var users = [];
        var filteredUsers = [];
        var result = [];
        MessageCenter.find({}, function (err, data) {
            if (err) {
                //res.json({status:404,message:"Failure",data:err});
            } else {
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].feedDetails.length; j++) {
                        if (type != "All") {
                            if (type === data[i].feedDetails[j].feedType) {
                                if (date1 != "") {
                                    date1 = moment.tz(new Date(date1), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                    date2 = moment.tz(new Date(date2), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                    data[i].feedDetails[j].createdDate = moment.tz(data[i].feedDetails[j].createdDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                    if (new Date(data[i].feedDetails[j].createdDate).getTime() >= new Date(date2).getTime() && new Date(data[i].feedDetails[j].createdDate).getTime() <= new Date(date1).getTime()) {
                                        users.push(data[i].feedDetails[j].userId);
                                    }
                                } else {
                                    users.push(data[i].feedDetails[j].userId);
                                }
                            }
                        } else if (type === "All") {
                            if (date1 != "") {
                                date1 = moment.tz(new Date(date1), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                date2 = moment.tz(new Date(date2), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                data[i].feedDetails[j].createdDate = moment.tz(data[i].feedDetails[j].createdDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                if (new Date(data[i].feedDetails[j].createdDate).getTime() >= new Date(date2).getTime() && new Date(data[i].feedDetails[j].createdDate).getTime() <= new Date(date1).getTime()) {
                                    users.push(data[i].feedDetails[j].userId);
                                }
                            } else {
                                users.push(data[i].feedDetails[j].userId);
                            }
                        }
                    }
                }
                var counts = {};
                users.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
                var keys = Object.keys(counts);
                for (var k = 0; k < keys.length; k++) {
                    filteredUsers.push(keys[k]);
                }
                for (var l = 0; l < filteredUsers.length; l++) {
                    if (compare === 'Is equal to') {
                        if (counts[filteredUsers[l]] === count) {
                            result.push(filteredUsers[l]);
                        }
                    }
                    else if (compare === 'Is less than') {
                        if (counts[filteredUsers[l]] < count) {
                            result.push(filteredUsers[l]);
                        }
                    } else if (compare === 'Is greater than') {
                        if (counts[filteredUsers[l]] > count) {
                            result.push(filteredUsers[l]);
                        }
                    } else if (compare === 'withinRange') {
                        if (counts[filteredUsers[l]] >= fromCount && counts[filteredUsers[l]] <= toCount) {
                            result.push(filteredUsers[l]);
                        }
                    }
                }
                //res.json({status:200,message:"Success",data:users});
                result = result.map(String);
                result = unique(result);
                resolve({ list: result, reqObj: { schedule, description, title, imageUrl, id } });
            }
        });
    })
    return challengesPromise;
}
function challengesParticipated(date, type, schedule, description, title, imageUrl, id) {
    var challengesPromise = new Promise((resolve, reject) => {
        var users = [];
        var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
        MessageCenter.find({}, function (err, data) {
            if (err) {
                //res.json({status:404,message:"Failure",data:err});
            } else {
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].feedDetails.length; j++) {
                        if (type != "All") {
                            if (type === data[i].feedDetails[j].feedType) {
                                if (date != "") {
                                    date = moment.tz(date, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                    data[i].feedDetails[j].createdDate = moment.tz(data[i].feedDetails[j].createdDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                    if (new Date(data[i].feedDetails[j].createdDate).getTime() >= new Date(date).getTime() && new Date(data[i].feedDetails[j].createdDate).getTime() <= new Date(today).getTime()) {
                                        users.push(data[i].feedDetails[j].userId);
                                    }
                                } else {
                                    users.push(data[i].feedDetails[j].userId);
                                }
                            }
                        } else if (type === "All") {
                            if (date != "") {
                                date = moment.tz(date, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                data[i].feedDetails[j].createdDate = moment.tz(data[i].feedDetails[j].createdDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                if (new Date(data[i].feedDetails[j].createdDate).getTime() >= new Date(date).getTime() && new Date(data[i].feedDetails[j].createdDate).getTime() <= new Date(today).getTime()) {
                                    users.push(data[i].feedDetails[j].userId);
                                }
                            } else {
                                users.push(data[i].feedDetails[j].userId);
                            }
                        }
                    }
                }
                users = users.map(String);
                users = unique(users);
                resolve({ list: users, reqObj: { schedule, description, title, imageUrl, id } });
                // res.json({status:200,message:"Success",data:users});
            }
        })
    })
    return challengesPromise;
}
function challengesParticipatedRange(date1, date2, type, schedule, description, title, imageUrl, id) {
    var challengesPromise = new Promise((resolve, reject) => {
        var users = [];
        MessageCenter.find({}, function (err, data) {
            if (err) {
                //res.json({ status: 404, message: "Failure", data: err });
            } else {
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].feedDetails.length; j++) {
                        if (type != "All") {
                            if (type === data[i].feedDetails[j].feedType) {
                                if (date1 != "") {
                                    date1 = moment.tz(date1, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                    date2 = moment.tz(date2, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                    data[i].feedDetails[j].createdDate = moment.tz(data[i].feedDetails[j].createdDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                    if (new Date(data[i].feedDetails[j].createdDate).getTime() >= new Date(date2).getTime() && new Date(data[i].feedDetails[j].createdDate).getTime() <= new Date(date1).getTime()) {
                                        users.push(data[i].feedDetails[j].userId);
                                    }
                                } else {
                                    users.push(data[i].feedDetails[j].userId);
                                }
                            }
                        } else if (type === "All") {
                            if (date1 != "") {
                                date1 = moment.tz(date1, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                date2 = moment.tz(date2, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                data[i].feedDetails[j].createdDate = moment.tz(data[i].feedDetails[j].createdDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                if (new Date(data[i].feedDetails[j].createdDate).getTime() >= new Date(date2).getTime() && new Date(data[i].feedDetails[j].createdDate).getTime() <= new Date(date1).getTime()) {
                                    users.push(data[i].feedDetails[j].userId);
                                }
                            } else {
                                users.push(data[i].feedDetails[j].userId);
                            }
                        }
                    }
                }
                users = users.map(String);
                users = unique(users);
                resolve({ list: users, reqObj: { schedule, description, title, imageUrl, id } });
                //res.json({ status: 200, message: "Success", data: users });
            }
        })
    })
    return challengesPromise;
}
function reuse(date, date1, date2, databaseDate, databaseId, todayDate, users) {
    if (date != "") {
        date = moment.tz(date, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
        databaseDate = moment.tz(databaseDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
        if (new Date(databaseDate).getTime() >= new Date(date).getTime() && new Date(databaseDate).getTime() <= new Date(todayDate).getTime()) {
            users.push(databaseId);
        }
    }
    else if (date1) {
        date1 = moment.tz(date1, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
        date2 = moment.tz(date2, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
        databaseDate = moment.tz(databaseDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
        if (new Date(databaseDate).getTime() >= new Date(date2).getTime() && new Date(databaseDate).getTime() <= new Date(date1).getTime()) {
            users.push(databaseId);
        }
    }
    else {
        users.push(databaseId);
    }
    return users;
}

function reuseFanclubCount(data, date, date1, date2, today, users, filteredUsers, compare, result, count, startCount, endCount) {
    if (data) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].users.length; j++) {
                users = reuse(date, date1, date2, data[i].users[j].createdDate, data[i].users[j].userId, today, users);
            }
        }
        var counts = {};
        users.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        var keys = Object.keys(counts);
        for (var k = 0; k < keys.length; k++) {
            filteredUsers.push(keys[k]);
        }
        for (var l = 0; l < filteredUsers.length; l++) {
            if (compare === 'Is equal to') {
                if (counts[filteredUsers[l]] === count) {
                    result.push(filteredUsers[l]);
                }
            }
            else if (compare === 'Is less than') {
                if (counts[filteredUsers[l]] < count) {
                    result.push(filteredUsers[l]);
                }
            } else if (compare === 'Is greater than') {
                if (counts[filteredUsers[l]] > count) {
                    result.push(filteredUsers[l]);
                }
            } else if (compare === 'within range') {
                if (counts[filteredUsers[l]] >= startCount && counts[filteredUsers[l]] <= endCount) {
                    result.push(filteredUsers[l]);
                }
            }
        }
        // res.json({ status: 200, message: "Success", data: result });
        return result;
    }
}
function joinedFanclub(catId, subCatId, celebrityName, date, date1, date2, value, schedule, description, title, imageUrl, id) {
    var fanclubPromise = new Promise((resolve, reject) => {
        var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
        var users = [];
        var usersLi = [];
        var filteredUsers = [];
        var filter = '';
        var userFilter = '';
        if (catId && (subCatId != "" && subCatId != "All")) {
            filter = {
                "catSubCategories._id": ObjectId(catId),
                "catSubCategories.subCategories": ObjectId(subCatId)
            }
            userFilter = {
                "categories._id": ObjectId(catId),
                "categories.subCategories": ObjectId(subCatId)
            }
        } else if (catId != "") {
            filter = {
                "catSubCategories._id": catId
            }
            userFilter = {
                "categories._id": ObjectId(catId)
            }
        } else {
            filter = {}
            userFilter = {}
        }
        console.log("filter", filter, "userFilter", userFilter);
        Fanclubs.aggregate([{ $match: filter },
        {
            $project: { _id: 0, 'users': 1, 'celebrityName': 1 }
        }], function (err, data) {
            if (err) {
                //res.json({ status: 404, message: 'Failure', data: err })
            }
            else {
                for (var i = 0; i < data.length; i++) {
                    if (celebrityName != "") {
                        if (data[i].celebrityName === celebrityName) {
                            for (var j = 0; j < data[i].users.length; j++) {
                                users = reuse(date, date1, date2, data[i].users[j].createdDate, data[i].users[j].userId, today, users);
                                let usersL = users.map(String);
                                usersLi = unique(usersL);
                            }
                        }
                    } else {
                        for (var j = 0; j < data[i].users.length; j++) {
                            users = reuse(date, date1, date2, data[i].users[j].createdDate, data[i].users[j].userId, today, users);
                            let usersL = users.map(String);
                            usersLi = unique(usersL);
                        }
                    }
                }
                if (value === "wasNotPerformed") {
                    UserDetails.aggregate([{ $match: userFilter },
                    { $project: { _id: 1 } }], function (err, data) {
                        if (err) {
                            //res.json({ status: 404, message: "Failure", data: err });
                        } else {
                            var finalUsers = [];
                            for (var i = 0; i < data.length; i++) {
                                filteredUsers.push(data[i]._id);
                            }
                            var filteredUsersList = filteredUsers.map(String);
                            finalUsers = _.difference(filteredUsersList, usersLi)
                            //res.json({ status: 200, message: "Success", data: finalUsers });
                            // resolve(finalUsers);
                            console.log("finalUsers", finalUsers)
                            resolve({ list: finalUsers, reqObj: { schedule, description, title, imageUrl, id } });
                        }
                    })
                } else {
                    console.log("usersLi", usersLi)
                    //res.json({ status: 200, message: 'Success', data: usersLi });
                    resolve({ list: usersLi, reqObj: { schedule, description, title, imageUrl, id } });
                }
            }
        })
    })
    return fanclubPromise;
}
function fanclubCount(compare, count, startCount, endCount, date, date1, date2, catId, subCatId, schedule, description, title, imageUrl, id) {
    var fanclubPromise = new Promise((resolve, reject) => {
        var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
        var users = [];
        var filteredUsers = [];
        var result = [];
        var filter = '';
        if (catId && (subCatId != "" && subCatId != "All")) {
            filter = {
                "catSubCategories._id": ObjectId(catId),
                "catSubCategories.subCategories": ObjectId(subCatId)
            }
        } else if (catId != "") {
            filter = {
                "catSubCategories._id": catId
            }
        } else {
            filter = {}
        }
        Fanclubs.aggregate([{ $match: filter }, {
            $project: { _id: 0, 'users': 1 }
        }], function (err, data) {
            // if (err) //res.json({ status: 404, message: "Failure", data: err });
            result = reuseFanclubCount(data, date, date1, date2, today, users, filteredUsers, compare, result, count, startCount, endCount);
            resolve({ list: result, reqObj: { schedule, description, title, imageUrl, id } });
        })
    })
    return fanclubPromise;
}
function createFanclub(catId, subCatId, celebrityName, date, date1, date2, value, schedule, description, title, imageUrl, id) {
    var fanclubPromise = new Promise((resolve, reject) => {
        var users = [];
        var usersLi = [];
        var filteredUsers = [];
        var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
        var filter = '';
        var userFilter = '';
        if (catId && (subCatId != "" && subCatId != "All")) {
            filter = {
                "catSubCategories._id": ObjectId(catId),
                "catSubCategories.subCategories": ObjectId(subCatId)
            }
            userFilter = {
                "categories._id": ObjectId(catId),
                "categories.subCategories": ObjectId(subCatId)
            }
        } else if (catId != "") {
            filter = {
                "catSubCategories._id": catId
            }
            userFilter = {
                "categories._id": ObjectId(catId)
            }
        } else {
            filter = {}
            userFilter = {}
        }
        Fanclubs.aggregate([{ $match: filter }, {
            $project: { _id: 0, 'userId': 1, "celebrityName": 1, 'createdDate': 1 }
        }], function (err, data) {
            //if (err) //res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if (celebrityName != "") {
                        if (data[i].celebrityName === celebrityName) {
                            users = reuse(date, date1, date2, data[i].createdDate, data[i].userId, today, users);
                            let usersL = users.map(String);
                            usersLi = unique(usersL);
                        }
                    } else {
                        users = reuse(date, date1, date2, data[i].createdDate, data[i].userId, today, users);
                        let usersL = users.map(String);
                        usersLi = unique(usersL);
                    }
                }
                if (value === "wasNotPerformed") {
                    UserDetails.aggregate([{ $match: userFilter },
                    { $project: { _id: 1 } }], function (err, data) {
                        if (err) {
                            //res.json({ status: 404, message: "Failure", data: err });
                        } else {
                            var finalUsers = [];
                            for (var i = 0; i < data.length; i++) {
                                filteredUsers.push(data[i]._id);
                            }
                            var filteredUsersList = filteredUsers.map(String);
                            finalUsers = _.difference(filteredUsersList, usersLi)
                            //res.json({ status: 200, message: "Success", data: finalUsers });
                            resolve({ list: finalUsers, reqObj: { schedule, description, title, imageUrl, id } });
                        }
                    })
                } else {
                    // res.json({ status: 200, message: 'Success', data: usersLi });
                    resolve({ list: usersLi, reqObj: { schedule, description, title, imageUrl, id } });
                }
            }
        })
    })
    return fanclubPromise;
}
function createFanclubCount(catId, subCatId, count, startCount, endCount, date, date1, date2, compare, schedule, description, title, imageUrl, id) {
    var fanclubPromise = new Promise((resolve, reject) => {
        var users = [];
        var filteredUsers = [];
        var result = [];
        var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
        var filter = '';
        if (catId && (subCatId != "" && subCatId != "All")) {
            filter = {
                $match: {
                    "catSubCategories._id": ObjectId(catId),
                    "catSubCategories.subCategories": ObjectId(subCatId)
                }
            }
        } else if (catId != "") {
            filter = {
                $match: {
                    "catSubCategories._id": catId
                }
            }
        } else {
            filter = { $match: {} }
        }
        Fanclubs.aggregate([filter, {
            $project: { _id: 0, 'userId': 1, 'createdDate': 1 }
        }], function (err, data) {
            // if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    users = reuse(date, date1, date2, data[i].createdDate, data[i].userId, today, users);
                }
                var counts = {};
                users.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
                var keys = Object.keys(counts);

                for (var k = 0; k < keys.length; k++) {
                    filteredUsers.push(keys[k]);
                }
                for (var l = 0; l < filteredUsers.length; l++) {
                    if (compare === 'Is equal to') {
                        if (counts[filteredUsers[l]] === count) {
                            result.push(filteredUsers[l]);
                        }
                    }
                    else if (compare === 'Is less than') {
                        if (counts[filteredUsers[l]] < count) {
                            result.push(filteredUsers[l]);
                        }
                    } else if (compare === 'Is greater than') {
                        if (counts[filteredUsers[l]] > count) {
                            result.push(filteredUsers[l]);
                        }
                    } else if (compare === 'within range') {
                        if (counts[filteredUsers[l]] >= startCount && counts[filteredUsers[l]] <= endCount) {
                            result.push(filteredUsers[l]);
                        }
                    }
                }
                // res.json({ status: 200, message: "Success", data: result });
                resolve({ list: result, reqObj: { schedule, description, title, imageUrl, id } });
            }
        })
    })
    return fanclubPromise;
}
function fanclubMemberCount(catId, subCatId, count, startCount, endCount, date, date1, date2, compare, schedule, description, title, imageUrl, id) {
    var fanclubPromise = new Promise((resolve, reject) => {
        var users = [];
        var filteredUsers = [];
        var result = [];
        var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
        var filter = '';
        if (catId && (subCatId != "" && subCatId != "All")) {
            filter = {
                $match: {
                    "catSubCategories._id": ObjectId(catId),
                    "catSubCategories.subCategories": ObjectId(subCatId)
                }
            }
        } else if (catId != "") {
            filter = {
                $match: {
                    "catSubCategories._id": catId
                }
            }
        } else {
            filter = { $match: {} }
        }
        Fanclubs.aggregate([filter, {
            $project: { _id: 0, 'users': 1, 'userId': 1, 'createdDate': 1 }
        }], function (err, data) {
            //if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    //reuse(date, date1, date2, data[i].createdDate, data[i].userId, today, users);
                    if (date != "") {
                        date = moment.tz(date, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                        data[i].createdDate = moment.tz(data[i].createdDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                        if (new Date(data[i].createdDate).getTime() >= new Date(date).getTime() && new Date(data[i].createdDate).getTime() <= new Date(today).getTime()) {
                            if (compare === 'Is equal to') {
                                if (data[i].users.length === count) {
                                    result.push(data[i].userId);
                                }
                            }
                            else if (compare === 'Is less than') {
                                if (data[i].users.length < count) {
                                    result.push(data[i].userId);
                                }
                            } else if (compare === 'Is greater than') {
                                if (data[i].users.length > count) {
                                    result.push(data[i].userId);
                                }
                            } else if (compare === 'within range') {
                                if (data[i].users.length >= startCount && data[i].users.length <= endCount) {
                                    result.push(data[i].userId);
                                }
                            }
                        }
                    } else if (date1) {
                        date1 = moment.tz(date1, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                        date2 = moment.tz(date2, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                        data[i].createdDate = moment.tz(data[i].createdDate, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                        if (new Date(data[i].createdDate).getTime() >= new Date(date1).getTime() && new Date(data[i].createdDate).getTime() <= new Date(date2).getTime()) {
                            if (compare === 'Is equal to') {
                                if (data[i].users.length === count) {
                                    result.push(data[i].userId);
                                }
                            }
                            else if (compare === 'Is less than') {
                                if (data[i].users.length < count) {
                                    result.push(data[i].userId);
                                }
                            } else if (compare === 'Is greater than') {
                                if (data[i].users.length > count) {
                                    result.push(data[i].userId);
                                }
                            } else if (compare === 'within range') {
                                if (data[i].users.length >= startCount && data[i].users.length <= endCount) {
                                    result.push(data[i].userId);
                                }
                            }
                        }
                    } else {
                        if (compare === 'Is equal to') {
                            if (data[i].users.length === count) {
                                result.push(data[i].userId);
                            }
                        }
                        else if (compare === 'Is less than') {
                            if (data[i].users.length < count) {
                                result.push(data[i].userId);
                            }
                        } else if (compare === 'Is greater than') {
                            if (data[i].users.length > count) {
                                result.push(data[i].userId);
                            }
                        } else if (compare === 'within range') {
                            if (data[i].users.length >= startCount && data[i].users.length <= endCount) {
                                result.push(data[i].userId);
                            }
                        }
                    }
                }
                // res.json({ status: 200, message: "Success", data: result });
                result = result.map(String);
                result = unique(result)
                resolve({ list: result, reqObj: { schedule, description, title, imageUrl, id } });
            }
        })
    })
    return fanclubPromise;
}
function createEvent(catId, subCatId, date, date1, date2, schedule, description, title, imageUrl, id) {
    var fanclubPromise = new Promise((resolve, reject) => {
        var users = [];
        var fanclubUsers = [];
        var userIds = [];
        var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
        var filter = '';
        if (catId && (subCatId != "" && subCatId != "All")) {
            filter = {
                $match: {
                    "catSubCategories._id": ObjectId(catId),
                    "catSubCategories.subCategories": ObjectId(subCatId)
                }
            }
        } else if (catId != "") {
            filter = {
                $match: {
                    "catSubCategories._id": catId
                }
            }
        } else {
            filter = { $match: {} }
        }
        Fanclubs.aggregate([filter, {
            $project: { _id: 1, 'users': 1 }
        }], function (err, data) {
            //if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    fanclubUsers.push(data[i]._id);
                    for (var h = 0; h < data[i].users.length; h++) {
                        userIds.push(data[i].users[h].userId);
                    }
                }
                FanclubEvents.find({ 'fanClubId': { '$in': fanclubUsers } }, function (err, data1) {
                    //if (err) //res.json({ status: 404, message: "Failure", data: err })

                    if (data1) {
                        for (var i = 0; i < data1.length; i++) {
                            if (date != "") {
                                date = moment.tz(date, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                data1[i].createdDateTime = moment.tz(data1[i].createdDateTime, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                if (new Date(data1[i].createdDateTime).getTime() >= new Date(date).getTime() && new Date(data1[i].createdDateTime).getTime() <= new Date(today).getTime()) {
                                    users.push(data1[i].userId._id);
                                }
                            } else if (date1) {
                                date1 = moment.tz(date1, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                date2 = moment.tz(date2, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                data1[i].createdDateTime = moment.tz(data1[i].createdDateTime, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                if (new Date(data1[i].createdDateTime).getTime() >= new Date(date2).getTime() && new Date(data1[i].createdDateTime).getTime() <= new Date(date1).getTime()) {
                                    users.push(data1[i].userId._id);
                                }
                            } else {
                                users.push(data1[i].userId._id);
                            }
                        }
                        userIds = userIds.map(String);
                        users = users.map(String);
                        userIds = unique(userIds);
                        users = unique(users);
                        var finalUsers = _.difference(userIds, users);
                        //res.json({ status: 200, message: "Success", data: users })
                        resolve({ list: finalUsers, reqObj: { schedule, description, title, imageUrl, id } });
                    }
                })
                //res.json({ status: 200, message: "Success", data: fanclubUsers.length });
            }
        })
    })
    return fanclubPromise;
}
function createEventCount(catId, subCatId, compare, date, date1, date2, count, startCount, endCount, schedule, description, title, imageUrl, id) {
    var fanclubPromise = new Promise((resolve, reject) => {
        var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
        var fanclubUsers = [];
        var filteredUsers = [];
        var users = [];
        var result = [];
        var filter = '';
        if (catId && (subCatId != "" && subCatId != "All")) {
            filter = {
                $match: {
                    "catSubCategories._id": ObjectId(catId),
                    "catSubCategories.subCategories": ObjectId(subCatId)
                }
            }
        } else if (catId != "") {
            filter = {
                $match: {
                    "catSubCategories._id": catId
                }
            }
        } else {
            filter = { $match: {} }
        }
        Fanclubs.aggregate([filter, {
            $project: { _id: 1, 'users': 1 }
        }], function (err, data) {
            //if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    fanclubUsers.push(data[i]._id);
                }
                FanclubEvents.find({ 'fanClubId': { '$in': fanclubUsers } }, function (err, data1) {
                    //if (err) res.json({ status: 404, message: "Failure", data: err });
                    if (data1) {
                        for (var j = 0; j < data1.length; j++) {
                            if (date != "") {
                                date = moment.tz(date, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                data1[j].createdDateTime = moment.tz(data1[j].createdDateTime, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                if (new Date(data1[j].createdDateTime).getTime() >= new Date(date).getTime() && new Date(data1[j].createdDateTime).getTime() <= new Date(today).getTime()) {
                                    filteredUsers.push(data1[j].userId._id);
                                }
                            } else if (date1) {
                                date1 = moment.tz(date1, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                date2 = moment.tz(date2, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                data1[j].createdDateTime = moment.tz(data1[j].createdDateTime, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                if (new Date(data1[j].createdDateTime).getTime() >= new Date(date2).getTime() && new Date(data1[j].createdDateTime).getTime() <= new Date(date1).getTime()) {
                                    filteredUsers.push(data1[j].userId._id);
                                }
                            } else {
                                filteredUsers.push(data1[j].userId._id);
                            }
                        }
                        var counts = {};
                        filteredUsers.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
                        var keys = Object.keys(counts);
                        for (var k = 0; k < keys.length; k++) {
                            users.push(keys[k]);
                        }
                        for (var l = 0; l < users.length; l++) {
                            if (compare === 'Is equal to') {
                                if (counts[users[l]] === count) {
                                    result.push(users[l]);
                                }
                            }
                            else if (compare === 'Is less than') {
                                if (counts[users[l]] < count) {
                                    result.push(users[l]);
                                }
                            } else if (compare === 'Is greater than') {
                                if (counts[users[l]] > count) {
                                    result.push(users[l]);
                                }
                            } else if (compare === 'within range') {
                                if (counts[users[l]] >= startCount && counts[users[l]] <= endCount) {
                                    result.push(users[l]);
                                }
                            }
                        }
                        // res.json({ status: 200, message: "Success", data: result });
                        result = result.map(String);
                        result = unique(result);
                        resolve({ list: result, reqObj: { schedule, description, title, imageUrl, id } });
                    }
                })
                // res.json({status:200,message:"Success",data:users});
            }
        })
    })
    return fanclubPromise;
}
function fanclubFeed(catId, subCatId, date, date1, date2, schedule, description, title, imageUrl, id) {
    var fanclubPromise = new Promise((resolve, reject) => {
        var users = [];
        var fanclubUsers = [];
        var userIds = [];
        var today = moment.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
        var filter = '';
        if (catId && (subCatId != "" && subCatId != "All")) {
            filter = {
                $match: {
                    "catSubCategories._id": ObjectId(catId),
                    "catSubCategories.subCategories": ObjectId(subCatId)
                }
            }
        } else if (catId != "") {
            filter = {
                $match: {
                    "catSubCategories._id": catId
                }
            }
        } else {
            filter = { $match: {} }
        }
        Fanclubs.aggregate([filter, {
            $project: { _id: 1, 'users': 1 }
        }], function (err, data) {
            //if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    fanclubUsers.push(data[i]._id);
                    for (var h = 0; h < data[i].users.length; h++) {
                        userIds.push(data[i].users[h].userId);
                    }
                }
                FanclubFeed.find({ 'fanClubId': { '$in': fanclubUsers } }, function (err, data1) {
                    //if (err) res.json({ status: 404, message: "Failure", data: err })
                    if (data1) {
                        for (var j = 0; j < data1.length; j++) {
                            if (date != "") {
                                date = moment.tz(date, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                data1[j].createdDateTime = moment.tz(data1[j].createdDateTime, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                if (new Date(data1[j].createdDateTime).getTime() >= new Date(date).getTime() && new Date(data1[j].createdDateTime).getTime() <= new Date(today).getTime()) {
                                    users.push(data1[j].createdUser._id);
                                }
                            } else if (date1) {
                                date1 = moment.tz(date1, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                date2 = moment.tz(date2, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                data1[j].createdDateTime = moment.tz(data1[j].createdDateTime, 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
                                if (new Date(data1[j].createdDateTime).getTime() >= new Date(date2).getTime() && new Date(data1[j].createdDateTime).getTime() <= new Date(date1).getTime()) {
                                    users.push(data1[j].createdUser._id);
                                }
                            } else {
                                users.push(data1[j].createdUser._id);
                            }
                        }
                        userIds = userIds.map(String);
                        users = users.map(String);
                        userIds = unique(userIds);
                        users = unique(users);
                        var finalUsers = _.difference(userIds, users);
                        // res.json({ status: 200, message: "Success", data: finalUsers })
                        resolve({ list: finalUsers, reqObj: { schedule, description, title, imageUrl, id } });
                    }
                })
                // res.json({ status: 200, message: "Success", data: fanclubUsers });
            }
        })
    })
    return fanclubPromise;
}
function referFriend(schedule, description, title, imageUrl, id) {
    var miscPromise = new Promise((resolve, reject) => {
        var users = [];
        var filterUsers = [];
        UserDetails.find({}, function (err, data) {
            //if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data.length; j++) {
                        filterUsers.push(data[i]._id);
                        if (data[i].referenceCode === data[j].referrelCode) {
                            users.push(data[i]._id);
                        }
                    }
                }
                users = unique(users);
                filterUsers = unique(filterUsers);
                users = _.difference(filterUsers, users);
                //res.json({ status: 200, message: "Success", data: users });
                resolve({ list: users, reqObj: { schedule, description, title, imageUrl, id } });
            }
        })
    })
    return miscPromise;
}
function createProfile(schedule, description, title, imageUrl, id) {
    var miscPromise = new Promise((resolve, reject) => {
        var users = [];
        UserDetails.find({}, function (err, data) {
            // if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].location === "" || data[i].fullName === "" || data[i].categories.length === 0) {
                        users.push(data[i]._id);
                    }
                }
                users = unique(users);
                //res.json({ status: 200, message: "Success", data: users });
                resolve({ list: users, reqObj: { schedule, description, title, imageUrl, id } });
            }
        })
    })
    return miscPromise;
}
function createProfilePicture(schedule, description, title, imageUrl, id) {
    var miscPromise = new Promise((resolve, reject) => {
        var users = [];
        UserDetails.find({}, function (err, data) {
            //if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].profileImage === "") {
                        users.push(data[i]._id);
                    }
                }
                //res.json({ status: 200, message: "Success", data: users });
                resolve({ list: users, reqObj: { schedule, description, title, imageUrl, id } });
            }
        })
    })
    return miscPromise;
}
function miscAllUsers(schedule, description, title, imageUrl, id) {
    var miscPromise = new Promise((resolve, reject) => {
        UserDetails.aggregate([{ $group: { _id: null, userIds: { $push: "$_id" } } }], function (err, data) {
            if (err) //res.json({ status: 404, message: "Failure", data: err })
                reject(err)
            if (data) {
                //res.json({ status: 200, message: "Success", data: data[0].userIds })
                resolve({ list: data[0].userIds, reqObj: { schedule, description, title, imageUrl, id } })
            }
        })
    })
    return miscPromise;
}
function miscFancoins(count, startCount, endCount, compare, schedule, description, title, imageUrl, id) {
    var miscPromise = new Promise((resolve, reject) => {
        var users = [];
        Fancoins.aggregate([
            { $group: { _id: { userId: '$userId' }, coins: { $sum: { $add: ["$coins"] } } } }
        ], function (err, data) {
            //if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if (compare === "Is equal to") {
                        if (data[i].coins === count) {
                            users.push(data[i]._id.userId);
                        }
                    }
                    if (compare === "Is less than") {
                        if (data[i].coins < count) {
                            users.push(data[i]._id.userId);
                        }
                    }
                    if (compare === "Is greater than") {
                        if (data[i].coins > count) {
                            users.push(data[i]._id.userId);
                        }
                    }
                    if (compare === "within range") {
                        if (data[i].coins >= startCount && data[i].coins <= endCount) {
                            users.push(data[i]._id.userId);
                        }
                    }
                }
                //res.json({ status: 200, message: "Success", data: users });
                resolve({ list: users, reqObj: { schedule, description, title, imageUrl, id } });
            }
        })
    })
    return miscPromise;
}
function fun2winParticipated(catId, subCatId, schedule, description, title, imageUrl, id) {
    var fun2winPromise = new Promise((resolve, reject) => {
        var input = req.body;
        var filter = '';
        if (catId && (subCatId != "" && subCatId != "All")) {
            filter = {
                $match: {
                    "categoryId": ObjectId(catId),
                    "subCategoryId": ObjectId(subCatId),
                    'userActions.isAnswered': 1
                }
            }
        } else if (catId != "") {
            filter = {
                $match: {
                    "categoryId": ObjectId(catId),
                    'userActions.isAnswered': 1
                }
            }
        } else {
            filter = {
                $match: {
                    'userActions.isAnswered': 1
                }
            }
        }
        Contentpacks.aggregate([{ $unwind: '$userActions' },
            filter,
        {
            $project: { _id: 0, 'userActions.userId': 1 }
        }], (err, data) => {
            if (err) {
                // res.sendStatus(403)
            }
            else {
                var userIds = []
                data.forEach((x) => {
                    userIds.push(String(x.userActions.userId))
                })
                var uniqueUsers = _.uniq(userIds)
                resolve({ list: uniqueUsers, reqObj: { schedule, description, title, imageUrl, id } });
            }
        })
    })
    return fun2winPromise;
}
function fun2winParticipatedCount(catId, subCatId, compare, schedule, description, title, imageUrl, id) {
    var fun2winPromise = new Promise((resolve, reject) => {
        var filter = '';
        if (catId && (subCatId != "" && subCatId != "All")) {
            filter = {
                $match: {
                    "categoryId": ObjectId(catId),
                    "subCategoryId": ObjectId(subCatId),
                    'userActions.isAnswered': 1
                }
            }
        } else if (catId != "") {
            filter = {
                $match: {
                    "categoryId": ObjectId(catId),
                    'userActions.isAnswered': 1
                }
            }
        } else {
            filter = {
                $match: {
                    'userActions.isAnswered': 1
                }
            }
        }
        Contentpacks.aggregate([{ $unwind: '$userActions' },
            filter,
        {
            $project: { _id: 0, 'userActions.userId': 1 }
        }], (err, data) => {
            if (err) {
                //res.json(err)
            }
            else {
                var userIds = [];
                var filteredUsers = [];
                var result = [];
                var counts = {};
                data.forEach((x) => {
                    userIds.push(x.userActions.userId)
                })
                for (var i = 0; i < userIds.length; i++) {
                    var num = userIds[i];
                    counts[num] = counts[num] ? counts[num] + 1 : 1;
                }
                var keys = Object.keys(counts);
                for (let k = 0; k < keys.length; k++) {
                    filteredUsers.push(keys[k]);
                }
                for (let i = 0; i < filteredUsers.length; i++) {
                    if (input.comparision === 'EqualsTo') {
                        if (counts[filteredUsers[i]] === input.count) {
                            result.push(filteredUsers[i]);
                        }
                    }
                    else if (input.comparision === 'GreaterThan') {
                        if (counts[filteredUsers[i]] > input.count) {
                            result.push(filteredUsers[i]);
                        }
                    }
                    else if (input.comparision === 'LessThan') {
                        if (counts[filteredUsers[i]] < input.count) {
                            result.push(filteredUsers[i]);
                        }
                    }
                    else if (input.comparision === 'WithinRange') {
                        if (counts[filteredUsers[i]] >= input.fromRange && counts[filteredUsers[i]] <= input.toRange) {
                            result.push(filteredUsers[i]);
                        }
                    }
                }
                //res.json({ status: 200, message: "Success", data: result });
                resolve({ list: result, reqObj: { schedule, description, title, imageUrl, id } });
            }
        })
    })
    return fun2winPromise;
}
function fun2winNotParticipated(catId, subCatId, schedule, description, title, imageUrl, id) {
    var fun2winPromise = new Promise((resolve, reject) => {
        var filter = '';
        var userFilter = '';
        if (catId && (subCatId != "" && subCatId != "All")) {
            filter = {
                $match: {
                    "categoryId": ObjectId(catId),
                    "subCategoryId": ObjectId(subCatId),
                    'userActions.isAnswered': 1
                }
            }
            userFilter = {
                $match: {
                    "categories._id": ObjectId(catId),
                    "categories.subCategories": ObjectId(subCatId)
                }
            }
        } else if (catId != "") {
            filter = {
                $match: {
                    "categoryId": ObjectId(catId),
                    'userActions.isAnswered': 1
                }
            }
            userFilter = {
                $match: {
                    "categories._id": ObjectId(catId)
                }
            }
        } else {
            filter = {
                $match: {
                    'userActions.isAnswered': 1
                }
            }
            userFilter = { $match: {} }
        }
        Contentpacks.aggregate([{ $unwind: '$userActions' },
            filter,
        {
            $project: { _id: 0, 'userActions.userId': 1 }
        }], (err, data) => {
            if (err) {
                //res.json({ status: 402, message: "Failure", data: err });
            }
            else {
                var userIds = []
                data.forEach((x) => {
                    userIds.push(x.userActions.userId)
                })
                UserProfile.aggregate([userFilter,
                    { $project: { _id: 1 } }], function (err, data1) {
                        if (err) {
                            //res.json({ status: 402, message: "Failure", data: err });
                        }
                        else {
                            var users = []
                            var result = [];
                            for (var i = 0; i < data1.length; i++) {
                                users.push(data1[i]._id);
                            }
                            userIds = userIds.map(String);
                            userIds = unique(userIds);
                            users = users.map(String);
                            result = difference(users, userIds);
                            // res.json({ status: 200, message: "Success", data: result });
                            resolve({ list: result, reqObj: { schedule, description, title, imageUrl, id } })
                        }
                    })
            }
        })
    })
    return fun2winPromise;
}
module.exports = {
    challengesLikesCount: challengesLikesCount,
    challengesLikesCountRange: challengesCountRange,
    challengesParticipatedCount: challengesParticipatedCount,
    challengesParticipatedCountRange: challengesParticipatedCountRange,
    challengesParticipated: challengesParticipated,
    challengesParticipatedRange: challengesParticipatedRange,
    joinedFanclub: joinedFanclub,
    fanclubCount: fanclubCount,
    createFanclub: createFanclub,
    createFanclubCount: createFanclubCount,
    fanclubMemberCount: fanclubMemberCount,
    createEvent: createEvent,
    createEventCount: createEventCount,
    fanclubFeed: fanclubFeed,
    referFriend: referFriend,
    createProfile: createProfile,
    createProfilePicture: createProfilePicture,
    miscFancoins: miscFancoins,
    miscAllUsers:miscAllUsers,
    fun2winParticipated: fun2winParticipated,
    fun2winParticipatedCount: fun2winParticipatedCount,
    fun2winNotParticipated: fun2winNotParticipated
}