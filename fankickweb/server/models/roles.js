var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');

// var running = Schema({
//       delete: { type: Schema.Types.Boolean },
//       view: { type: Schema.Types.Boolean }
// },{ _id: false })

// var queued = Schema({
//       delete: { type: Schema.Types.Boolean },
//       view: { type: Schema.Types.Boolean },
//       approve: { type: Schema.Types.Boolean },
//       edit: { type: Schema.Types.Boolean }
// },{ _id: false })

// var closed = Schema({
//       reschedule: { type: Schema.Types.Boolean },
//       view: { type: Schema.Types.Boolean }
// },{ _id: false })

// var fun2win = Schema({
//       status: { type: Schema.Types.Boolean },
//       running:running,
//       queued:queued,
//       closed:closed
// },{ _id: false })

// var permissions = Schema({
//       fun2win: fun2win,
//       challenges:{ type: Schema.Types.Boolean },
//       coupons:{ type: Schema.Types.Boolean },
//       fanClubs:{ type: Schema.Types.Boolean },
//       fanCoins:{ type: Schema.Types.Boolean },
//       funClubs:{ type: Schema.Types.Boolean },
//       notifications:{ type: Schema.Types.Boolean },
//       pinCeleb: { type: Schema.Types.Boolean }
// },{ _id: false })


// var rolesSchema = Schema({
//       name:String,
//       permissions: permissions
// }, { versionKey: false, collection: "WebRoles" });

// var rolesModel = mongoose.model('WebRoles', rolesSchema);
// exports = module.exports = rolesModel;

var rolesSchema = Schema({
      name:String
}, { versionKey: false, collection: "WebRoles" });

var rolesModel = mongoose.model('WebRoles', rolesSchema);
exports = module.exports = rolesModel;