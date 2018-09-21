// var mongoose = require('mongoose')
// mongoose.Promise = global.Promise
// var ObjectId = require('mongodb').ObjectID;
// var env = require('./getEnvDetails')
// var logger = require('./loggerCronJobs');
// var normalizedPath = require("path").join(__dirname, "./mongodb/schemas/");
// require("fs").readdirSync(normalizedPath).forEach(function (file) {
//     require("./mongodb/schemas/" + file);
// });


// var pub = process.env.APP_ENVIRONMENT || 'none'
// mongoose.connect(env[pub].databaseurl)
// var db = mongoose.connection
// db.on('error', console.error.bind(console, 'Database Connection Error:'))
// db.once('open', function () {
//     logger.debug('Connected to the database successfully.')
//     require('./routes/cronJob')
//     require('./cronJobs/addMembersCronJob')
//      require('./routes/deleteFireBaseDb')
// })

// exports = module.exports = {
//     mongoose: mongoose
// }




var mongoose = require('mongoose');
var properties = require('./properties');
var props;
if (process.env.NODE_ENV.trim() === 'dev')
    props = properties.dev;
if (process.env.NODE_ENV.trim() === 'qa')
    props = properties.qa;
if (process.env.NODE_ENV.trim() === 'preprod')
    props = properties.preprod;
if (process.env.NODE_ENV.trim() === 'prod')
    props = properties.prod;

var dbUrl = props.databaseurl;

mongoose.connect(dbUrl)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'Database Connection Error:'))
db.once('open', function () {
    console.log('Connected to the database successfully.')
    // require('./scheduled-cron-job')
})

exports = module.exports = {
    mongoose: mongoose
}

