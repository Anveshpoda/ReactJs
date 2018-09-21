var Blogs = require('../models/blog');
var moment = require('moment-timezone');


module.exports = function (app) {
    app.get('/getPublishBlogs', function (req, res) {
        Blogs.find({}, function (err, data) {
        if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data){ 
                data.sort(function(a,b){
                    return new Date(b.publishedDate).getTime()-new Date(a.publishedDate).getTime();
                })
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.get('/getBlogs', function (req, res) {
        Blogs.find({}, function (err, data) {
        if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data){ 
                data.sort(function(a,b){
                    return new Date(b.publishedDate).getTime()-new Date(a.publishedDate).getTime();
                })
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.post('/createBlog', function (req, res) {
        var input = req.body;
        var blog = new Blogs(input);
        blog.save((err) => {
            if (err) res.send(err)
            else {
                var result = blog.toObject();
                result.createdDate = moment(blog.createdDate).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: result })
            }
        })
    })
    app.get('/getBlog/:id', function (req, res) {
        Blogs.find({ _id: req.params.id }, function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            else if (data) {
                res.json({ status: 200, message: "Success", data: data });
            }
        })
    })
    app.delete('/deleteBlog/:id', function (req, res) {
        Blogs.remove({
            _id: req.params.id
        }, function (err, data) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Blog successfully deleted." });
        });
    });
    app.put('/editBlog/:id', function (req, res) {
        var input = req.body;
        Blogs.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, data) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: data });
        });
    })
    app.put('/updateBlog/:_id', function (req, res) {
        var input = req.body;
        Blogs.findById({ _id: req.params._id }, function (err, data) {
            data.blogStatus = input.blogStatus
            data.publishedDate = input.publishedDate;
            data.save((err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.json({ status: 200, message: "Success", data: data })
                }
            })
        })
    })
    app.get('/getTextBlogs', function (req, res) {
        Blogs.find({ type: "Text" }, function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                data.sort(function(a,b){
                    return new Date(b.publishedDate).getTime()-new Date(a.publishedDate).getTime();
                })
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.get('/getVideoBlogs', function (req, res) {
        Blogs.find({ type: "Video" }, function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                data.sort(function(a,b){
                    return new Date(b.publishedDate).getTime()-new Date(a.publishedDate).getTime();
                })
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.get('/getSlideBlogs', function (req, res) {
        Blogs.find({ type: "Slides" }, function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                data.sort(function(a,b){
                    return new Date(b.publishedDate).getTime()-new Date(a.publishedDate).getTime();
                })
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.get('/getMoviesBlogs', function (req, res) {
        Blogs.find({ category: "Movies" }, function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                data.sort(function(a,b){
                    return new Date(b.publishedDate).getTime()-new Date(a.publishedDate).getTime();
                })
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.get('/getSportsBlogs', function (req, res) {
        Blogs.find({ category: "Sports" }, function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                data.sort(function(a,b){
                    return new Date(b.publishedDate).getTime()-new Date(a.publishedDate).getTime();
                })
                res.json({ status: 200, message: "Success", data: data })
            }
          
        })
    })

   app.get('/getMusicBlogs', function (req, res) {
        Blogs.find({ category: "Music" }, function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                data.sort(function(a,b){
                    return new Date(b.publishedDate).getTime()-new Date(a.publishedDate).getTime();
                })
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.get('/getTvshowsBlogs', function (req, res) {
        Blogs.find({ category: "TV Shows" }, function (err, data) {
            if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                data.sort(function(a,b){
                    return new Date(b.publishedDate).getTime()-new Date(a.publishedDate).getTime();
                })
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
}