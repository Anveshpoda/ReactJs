var NotificationCategories=require('../../models/PushNotifications/NotificationCategoriesWeb');
var CustomNotifications = require('../../models/PushNotifications/customNotification')
var ScheduledNotifications = require('../../models/PushNotifications/scheduledNotification');

module.exports = function(app){
    app.get('/notificationCategory',function(req,res){
        NotificationCategories.find({ nTypeId : req.query.nTypeId },function(err,data){
            if(err){
                res.json({ status:404,message:"Failure",data:err});
            }else{
                res.json({ status:200,message:"Success",data:data});
            }
        })
    })
    // To get the All Sent(Custom, Scheduled) Notifications.
    app.get('/getAllNotifications',function(req,res){
        
        ScheduledNotifications.find({ },function(err, notifications){
            if(err){
                res.json({ status:404,message:"Failure",data:err});
            }else{
                CustomNotifications.find({}, function(err, data){
                    if(err)
                    res.json({ status:404, message: "Failure", data: err})
                    else{
                        var arr1 = [...notifications, ...data]
                        res.json({ status:200,message:"Success", data:arr1});
                    }
                })
            }
        })
    })

}