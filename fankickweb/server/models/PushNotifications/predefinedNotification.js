var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var predefinedNotificationModel=function(){
    var predefinedSchema=Schema({
        type : String,
        category : String,
        notification : String,
        title : String,
        description : String,
        imageURL : String,
        createdDate : { type : Date, default : Date.now },
        onOrOff : Boolean,
        inApp : Boolean
    },{ versionKey:false,collection:"PredefinedNotifications"});

    return mongoose.model("PredefinedNotifications",predefinedSchema);
}
module.exports=new predefinedNotificationModel();