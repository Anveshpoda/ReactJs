var mongoose = require('mongoose')
var Schema = mongoose.Schema

var creativesSchema = Schema({
    creativeName: String,
    creativeType: String,
    creativeDescription: String,
    creativeSize: Number,
    creativeTags: [String],
    creativeMediaUrl: String
})


var castAndCrewSchema = Schema({
    celebrityName: String,
    occupation: String,
    celebrityImageUrl: String
})

var movieCreativeSchema = Schema({
    creativeType: String,
    movieName: String,
    movieGenre: String,
    movieDescription: String,
    movieReleaseDate: Date,
    movieExpiryDate: Date,
    castAndCrew: [castAndCrewSchema],
    facebookLink: String,
    trailerUrl: String,
    instagramLink: String,
    creatives: [creativesSchema],
    isPublished: { type: Boolean, default: false }
}, { versionKey: false, collection: 'MovieCreatives' })



var movieCreative = mongoose.model('MovieCreatives', movieCreativeSchema)

exports = module.exports = movieCreative;