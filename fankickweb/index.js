var express = require('express');
var cors = require('cors')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Database = require('./server/models/database');
var config = require('./config.json');
var app = express();
var fileUpload=require('express-fileupload');
var props;
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(fileUpload());
app.use(cors())

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

require('./server/controller/index')(app);
require('./server/controller/messageCenter')(app);
require('./server/controller/categories')(app);
require('./server/controller/contentpacks')(app);
require('./server/controller/fancoins')(app);
require('./server/controller/trendingPosts')(app);
require('./server/controller/PushNotifications/predefinedNotification')(app);
require('./server/controller/PushNotifications/NotificationTypesWeb')(app);
require('./server/controller/PushNotifications/CustomNotifications/Fun2WinNotifications')(app);
require('./server/controller/PushNotifications/NotificationCategoriesWeb')(app);
require('./server/controller/PushNotifications/NotificationSubCategoryWeb')(app);
require('./server/controller/PushNotifications/CelebrityNames')(app);
require('./server/controller/PushNotifications/fanclubData')(app);
require('./server/controller/PushNotifications/UserDetails')(app);
require('./server/controller/PushNotifications/customNotification')(app);
require('./server/controller/PushNotifications/scheduledNotification')(app);
require('./server/controller/PushNotifications/CustomNotifications/ChallengesNotifications')(app);
require('./server/controller/Coupons')(app);
require('./server/controller/ApprovalCycleMessages')(app);
require('./server/controller/Locations')(app);
require('./server/controller/fanclubs')(app);
require('./server/controller/stateNames')(app);
require('./server/controller/funclubs')(app);
require('./server/controller/Celebrities')(app);
require('./server/controller/KeyWords')(app);
require('./server/controller/blog')(app);
require('./server/controller/creatives')(app);
require('./server/controller/SocialMediaContests')(app);
require('./server/scheduled-cron-job');

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'dev') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

Database.config(
  config && config.mongodb && config.mongodb.address ? config.mongodb.address : '', 'fanplanet',
  
  config.mongodb && config.mongodb.options ? config.mongodb.options : undefined,
  function(err, message) {
    if (!err) console.info('  - Mongodb is connected');
    
  }
);

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
