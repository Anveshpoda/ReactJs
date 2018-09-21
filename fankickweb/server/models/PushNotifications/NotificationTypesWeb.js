var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var notificationTypeWebModel=function(){
    var notificationTypeWebSchema=Schema({
        _id : Schema.Types.ObjectId,
        name : String
    },{ versionKey : false, collection : "NotificationTypesWeb"});

    return mongoose.model("NotificationTypesWeb",notificationTypeWebSchema);
}

module.exports=new notificationTypeWebModel();