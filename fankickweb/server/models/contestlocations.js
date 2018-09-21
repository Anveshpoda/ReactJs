var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var coordinatesSchema = Schema({
    area: String,
    latitude: Number,
    longitude: Number
})

var contestLocationSchema = Schema({
    city: String,
    state: String,
    country: String,
    coordinates: [coordinatesSchema]

}, {timestamps: true, versionKey: false, collection: "contestLocations" });

var contestLocationsModel = mongoose.model('contestLocations', contestLocationSchema);

exports = module.exports = contestLocationsModel;