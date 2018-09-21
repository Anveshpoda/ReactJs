var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = function () {
    var slidesSchema=Schema({
        slideTitle:String,
        slideDescription:String,
        slideImageUrl:String
    })

    var blog = Schema({
        title: String,
        type:String,
        publishedDate: Date,
        createdDate: { type: Date, default: Date.now },
        category: String,
        content: String,
        subCategory: String,
        imageUrl:String,
        categoryId:Schema.Types.ObjectId,
        subCategoryId:Schema.Types.ObjectId,
        authorName: String,
        blogStatus: String,
        imageUrl:String,
        videoUrl:String,
        slides:[slidesSchema]
    }, { versionKey: false, collection: "Blogs" })
    return mongoose.model("Blogs", blog);
}
module.exports = new blogSchema();
