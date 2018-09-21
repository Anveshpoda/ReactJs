var TrendingPosts = require('../models/trendingPosts');
var VerifyToken = require('../security/TokenVerification');
var moment = require('moment-timezone');
var requestify = require('requestify');
var Twitter = require('twitter');

module.exports = function (app) {
    app.post('/trendingPosts', VerifyToken, (req, res) => {
        var input = req.body;
        var post = new TrendingPosts(input);
        post.save((err) => {
            if (err) res.json({ status: 404, message: "Failure", data: err });
            else {
                var data = post.toObject();
                data.createdDate = moment(post.createdDate).format('YYYY-MM-DD hh:mm:ss A');
                data.modifiedDate = moment(post.modifiedDate).format('YYYY-MM-DD hh:mm:ss A');
                res.json({ status: 200, message: "Success", data: data });
            }
        })
    })
    app.get('/trendingPosts', VerifyToken, (req, res) => {
        TrendingPosts.find({ isDeleted: false }).sort({ createdDate: -1 }).exec((err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.get('/trendingPosts/:id', VerifyToken, (req, res) => {
        TrendingPosts.findById(req.params.id, (err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })
    app.put('/trendingPosts/:id', VerifyToken, (req, res) => {
        TrendingPosts.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, data) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: data });
        });
    })

    // app.get('/posts/:id', VerifyToken, (req, res) => {
    //     let timestamp = Math.round(Date.now() / 1000);
    //     console.log("nonce",btoa(consumerKey + ':' + timestamp))
    //     // var generateNonce = function (length) {
    //     //     var text = "";
    //     //     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //     //     for (var i = 0; i < length; i++) {
    //     //         text += possible.charAt(Math.floor(Math.random() * possible.length));
    //     //     }
    //     //     return text;
    //     // }

    //     var consumerKey = 'qpBEsiyPaN2KoMTvCkv8PepJT';
    //     let nonce = btoa(consumerKey + ':' + timestamp);
    //     let accessToken = '1001800215324577792-EGbGNWABceOSMZgEP0WYKBoAm5Saex';
    //     let consumerSecret = '02VtMgRRUBm9uLEflSygeAgtHwVD0406UevgHWIYuNYl0mJ45c';
    //     let accessTokenSecret = 'z0W52NDEAmVOrdoqjvVngyjoaxj0he7fxY5T4wak4mCI9';
    //     var httpMethod = 'GET';
    //     var baseUrl = 'https://api.twitter.com/1.1/statuses/show.json';
    //     let baseString = oAuthBaseString(httpMethod, baseUrl, reqParams, consumerKey, accessToken, timestamp, nonce);
    //     let signingKey = oAuthSigningKey(consumerSecret, accessTokenSecret);
    //     let signature = oAuthSignature(baseString, signingKey);
    //     console.log("time", timestamp, typeof timestamp, req.params.id, nonce)
    //     // var httpMethod = 'GET',
    //     //     url = 'https://api.twitter.com/1.1/statuses/show.json',
    //     //     parameters = {
    //     //         oauth_consumer_key: 'qpBEsiyPaN2KoMTvCkv8PepJT',
    //     //         oauth_token: '1001800215324577792-EGbGNWABceOSMZgEP0WYKBoAm5Saex',
    //     //         oauth_nonce: nonce,
    //     //         oauth_timestamp: timestamp,
    //     //         oauth_signature_method: 'HMAC-SHA1',
    //     //         oauth_version: '1.0',
    //     //         //file: 'vacation.jpg',
    //     //         //size: 'original'
    //     //     },
    //     //     consumerSecret = '02VtMgRRUBm9uLEflSygeAgtHwVD0406UevgHWIYuNYl0mJ45c',
    //     //     tokenSecret = 'z0W52NDEAmVOrdoqjvVngyjoaxj0he7fxY5T4wak4mCI9',
    //     //     // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
    //     //     encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret),
    //     //     // generates a BASE64 encode HMAC-SHA1 hash
    //     //     signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret,
    //     //         { encodeSignature: true });
    //     console.log("signature", signature);
    //     requestify.get("https://api.twitter.com/1.1/statuses/show.json?id=" + req.params.id,
    //         {
    //             headers: {
    //                 Authorization: 'OAuth realm="https://api.twitter.com/1.1/statuses/show.json",id="' + req.params.id + '",oauth_consumer_key="qpBEsiyPaN2KoMTvCkv8PepJT",oauth_token="1001800215324577792-EGbGNWABceOSMZgEP0WYKBoAm5Saex",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1532424536",oauth_nonce="WmIn4N",oauth_version="1.0",oauth_signature="t9pi%2B%2Fw4PiZlAVI62rt7H9iE1vo%3D"',
    //                 'Content-Type': 'application/json',
    //                 //'x-access-token': sessionStorage.getItem('token')
    //             },
    //             withCredentials: true
    //         }).then(function (response) {
    //             if (response.getBody()) {
    //                 //if (response.getBody().statusCode == 1) {
    //                 console.log("statusCode", response.getBody());
    //                 // } 
    //                 res.json({ status: 200, message: "Success", data: response.getBody() })
    //             }
    //             else {
    //                 console.log("error");
    //             }
    //         }).catch(function (error) {
    //             console.log(error)
    //         });
    // })

    app.get('/posts/:id', VerifyToken, (req, res) => {
        var client = new Twitter({
            consumer_key: '1xIIwQ7VhqMgUj0LcNjLAd67h',
            consumer_secret: '3kRfQpVdIoW7St4SZUiIYLqdCtH0LQDefSEkXuH5lb1L2Gxk4D',
            access_token_key: '827131219607486464-VR7Ipc8O5xJ28EBsKeVaWaqaZGFRcon',
            access_token_secret: 'ER7zWkDufbNcKqViY8BLgAWQogvi1bQmonJ5IVRsdakez'
        });

        //var params = { screen_name: 'nodejs' };
        client.get('https://api.twitter.com/1.1/statuses/show.json?id=' + req.params.id + '&tweet_mode=extended', function (error, tweets, response) {
            if (!error) {
                res.json({ status: 200, message: "Success", data: tweets })
            }
        });
    })

    app.get('/instaPosts/:id', VerifyToken, (req, res) => {
        requestify.get('https://www.instagram.com/p/' + req.params.id + '/?__a=1').then((response) => {
            if (response.getBody()) {
                res.json({ status: 200, message: "Success", data: response.getBody() })
            }
        })
    })
}

