var mongoose = require('mongoose');
var properties = require('../properties');
var props;

if (process.env.NODE_ENV == undefined) {
  props = properties.qa;
} else if (process.env.NODE_ENV != undefined) {
  var a = process.env.NODE_ENV.trim();
  props = properties[a];
}

var dbUrl = props.databaseurl;

var db = function () {
  var initFlag = false;
  return {

    config: function (addr, dbname, opts, callback) {
      if (!initFlag) {
        var connectUrl = dbUrl;
        mongoose.Promise = global.Promise;
        mongoose.connect(connectUrl, (opts ? opts : {}));

        var db = mongoose.connection;

        db.on('error', function (err) {
          // Connection Error
          console.log('Mongodb error encountered [' + err + ']');

          if (callback) {
            callback('ERR-MONGODB', 'mongodb - ' + err.message);
          }
        });

        db.once('open', function () {
          initFlag = true;
          if (callback) callback(null);
        });
      } else {
        if (callback) callback(null);
      }
    }
  };
};

module.exports = db();