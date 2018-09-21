var mongoose = require('mongoose')
var Schema = mongoose.Schema

var StringRequired = {
    type: String,
    required: true
}

//Subcategory Schema
subCategoriesSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String
})

//Category Schema
CategoriesSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    imageUrl: String,
    subCategories: [subCategoriesSchema]
}, { versionKey: false, collection: "Categories" })

var categories = mongoose.model('Categories', CategoriesSchema)

module.exports = categories