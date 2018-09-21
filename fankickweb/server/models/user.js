var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');
/**
 * User 
 * @name userModel
 */
// var userModel = function () {

//   var userSchema = mongoose.Schema({
//     username: String,
//     password: String,
//     email: String,
//     location: String,
//     title: String,
//     firstname: String,
//     lastname: String,
//     role: String,
//     phonenumber: String,
//     role: { type: Schema.Types.ObjectId, autopopulate: true, ref: 'WebRoles' },
//   }, { timestamps: true, versionKey: false, collection: 'UsersWeb' });

//   userSchema.plugin(autopopulate)
//   return mongoose.model('UsersWeb', userSchema);
// };

// module.exports = new userModel();

var running = Schema({
  delete: { type: Schema.Types.Boolean },
  view: { type: Schema.Types.Boolean },
  close: { type: Schema.Types.Boolean },
  hook: { type: Schema.Types.Boolean },
  extendDuration: { type: Schema.Types.Boolean }
}, { _id: false })

var queued = Schema({
  delete: { type: Schema.Types.Boolean },
  view: { type: Schema.Types.Boolean },
  approve: { type: Schema.Types.Boolean },
  edit: { type: Schema.Types.Boolean }
}, { _id: false })

var closed = Schema({
  reschedule: { type: Schema.Types.Boolean },
  view: { type: Schema.Types.Boolean },
  analytics: { type: Schema.Types.Boolean }
}, { _id: false })

var fun2win = Schema({
  status: { type: Schema.Types.Boolean },
  running: running,
  queued: queued,
  closed: closed
}, { _id: false })

var coupons = Schema({
  status: { type: Schema.Types.Boolean },
  addNewBrand: Boolean,
  bulkUpload: Boolean,
  addNewCoupon: Boolean
}, { _id: false })

var fanFunCoins = Schema({
  status: { type: Schema.Types.Boolean },
  create: Boolean,
  edit: Boolean,
  feedPost: Boolean,
  feedReply: Boolean,
  feedDelete: Boolean
}, { _id: false })

var custom = Schema({
  view: Boolean,
  delete: Boolean,
  create: Boolean,
  edit: Boolean
}, { _id: false })

var notifications = Schema({
  status: { type: Schema.Types.Boolean },
  custom: custom,
  scheduled: custom,
  predefined: custom,
  allSent: custom
}, { _id: false })

var pinCeleb = Schema({
  status: { type: Schema.Types.Boolean },
  create: Boolean,
  edit: Boolean,
  delete: Boolean,
  view: Boolean,
  publish: Boolean
}, { _id: false })

var reports = Schema({
  status: { type: Schema.Types.Boolean },
  coupons: { type: Schema.Types.Boolean },
  fanCoins: { type: Schema.Types.Boolean },
  messageCenter: { type: Schema.Types.Boolean },
  fanClubs: { type: Schema.Types.Boolean },
  fun2win: { type: Schema.Types.Boolean },
  login: { type: Schema.Types.Boolean }
}, { _id: false })


var permissions = Schema({
  fun2win: fun2win,
  challenges: fun2win,
  coupons: coupons,
  fanClubs: fanFunCoins,
  fanCoins: fanFunCoins,
  funClubs: fanFunCoins,
  notifications: notifications,
  pinCeleb: pinCeleb,
  reports: reports,
  calendar: { type: Schema.Types.Boolean },
  polling: pinCeleb,
  blog: pinCeleb,
  metaData: pinCeleb
}, { _id: false })


var userModel = function () {
  var userSchema = Schema({
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    mobileNumber: String,
    profileImage: String,
    masterReviewer: { type: Schema.Types.ObjectId, autopopulate: true, ref: 'UsersWeb' },
    role: { type: Schema.Types.ObjectId, autopopulate: true, ref: 'WebRoles' },
    groupId: { type: Schema.Types.ObjectId, autopopulate: true, ref: 'WebUserGroups' },
    managerId: { type: Schema.Types.ObjectId },
    permissions: permissions
  }, { versionKey: false, collection: "UsersWeb" })

  userSchema.plugin(autopopulate)
  return mongoose.model('UsersWeb', userSchema);

}
module.exports = new userModel();

