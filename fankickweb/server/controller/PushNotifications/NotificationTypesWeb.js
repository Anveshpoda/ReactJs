var NotificationTypes=require('../../models/PushNotifications/NotificationTypesWeb');

module.exports = function(app){
    app.get('/notificationType',function(req,res){
        NotificationTypes.find({},function(err,data){
            if(err){
                res.json({ status:404,message:"Failure",data:err});
            }else{
                res.json({ status:200,message:"Success",data:data})
            }
        })
    })
}