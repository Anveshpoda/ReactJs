var User = require('../models/user');
var WebUserGroups = require('../models/WebUserGroups');
const moment = require('moment-timezone');
var bcrypt = require('bcrypt-nodejs');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var VerifyToken = require('../security/TokenVerification');
var properties = require('../properties');
var props;


if (process.env.NODE_ENV == undefined) {
    props = properties.qa;
} else if (process.env.NODE_ENV != undefined) {
    var a = process.env.NODE_ENV.trim();
    props = properties[a];
}
var baseurl = props.baseUrl;
module.exports = function (app) {
    app.post('/login', function (req, res) {
        var body = req.body;
        // check in mongo if a user with username exists or not
        User.findOne({ 'username': body.username },
            function (err, user) {
                // In case of any error, return using the done method
                if (err)
                    return res.json({ status: 404, message: 'Error', data: err });
                // Username does not exist, log error & redirect back
                if (!user) {
                    //console.log('User Not Found with username ' + body.username);
                    return res.json({ status: 404, message: 'User Not found.' });
                }
                // User exists but wrong password, log the error 
                if (!isValidPassword(user, body.password)) {
                    //console.log('Invalid Password');
                    return res.json({ status: 500, message: 'Invalid Password' });
                }
                // req.session.user = user;
                var token = jwt.sign({ username: user.username }, 'FanKick', {
                    expiresIn: 6000000 // expires in 24 hours
                });
                return res.json({ status: 200, message: 'Success', data: user, token: token });
            }
        );
    });

    app.post('/signup', function (req, res) {
        var body = req.body;
        User.findOne({ 'username': body.username }, function (err, user) {
            // In case of any error return
            if (err) {
                // console.log('Error in SignUp: ' + err);
                return res.json({ status: 404, message: 'Error', data: err });
            }
            // already exists
            if (user) {
                // console.log('User already exists');
                return res.json({ status: 404, message: 'User already exists' });
            } else {
                // if there is no user with that email
                // create the user
                var newUser = new User();
                // set the user's local credentials
                newUser.username = body.username;
                newUser.password = createHash(body.password);
                newUser.email = body.email;
                newUser.firstName = body.firstName;
                newUser.lastName = body.lastName;

                // save the user
                newUser.save(function (err) {
                    if (err) {
                        return res.json({ status: 404, message: 'Error', data: err });
                    }
                    // console.log('User Registration succesful');
                    return res.json({ status: 200, message: 'Success', data: newUser });
                });
            }
        });
    });

    app.post('/forgotpassword', function (req, res) {
        var body = req.body;
        User.findOne({ 'username': body.username }, function (err, user) {
            // In case of any error return
            if (err) {
                // console.log('Error in SignUp: ' + err);
                return res.json({ status: 404, message: 'Error', data: err });
            }
            if (user) {
                var emailData = {
                    userId: user._id,
                    username: user.username
                }
                var body = prepeareBodyHTML(emailData);
                sendEmail(body, user.email)
                res.json({ status: 200, message: "Success" });
            } else {
                res.json({ status: 404, message: "Failure" });
            }
        });
    });

    app.post('/reset/:userId', function (req, res) {
        var body = req.body;
        var userId = req.params.userId;
        // console.log(req.params);
        //  console.log(body);
        body.password = createHash(body.password);
        body.location = "King";
        User.findOneAndUpdate({ _id: req.params.userId }, body, { new: true }, function (err, user) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: user });
        });
    });

    app.put('/user/:userId', VerifyToken, function (req, res) {
        var body = req.body;
        if (body.password)
            body.password = createHash(body.password);
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, function (err, data) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: data });
        });
    });

    app.get('/user/:userId', VerifyToken, function (req, res) {
        User.findById(req.params.userId, function (err, data) {
            if (err)
                res.send(err);
            res.json({ status: 200, message: "Success", data: data });
        });
    });
}

function prepeareBodyHTML(emailData) {
    var body = "<a href='" + baseurl + "/resetpassword/" + emailData.userId + "' class='button'>" + "Rest Your Password" + "</a>";
    body = body + "<style>a.button { -webkit-appearance: button;-moz-appearance: button;"
        + "appearance: button;text-decoration: none;color: initial;}</style>"
    return body;
}

function sendEmail(body, toEmail) {
    //console.log("email",toEmail);
    var transporter = nodemailer.createTransport({
        service: 'Zoho',
        host: 'smtp.zoho.com',
        port: 2525,
        secure: true,
        ignoreTLS: true,
        requireTLS: false,
        auth: {
            user: 'info@fankick.io',
            pass: '$Info123'
        }
    });
    // setup email data with unicode symbols
    var mailOptions = {
        from: 'FanKick<info@fankick.io>', // sender address
        to: toEmail, // list of receivers
        subject: "FanKick: ForgotPassword Request", // Subject line
        // text: 'Hello world ?', // plain text body
        html: body // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return false;
        }
        // console.log('Message %s sent: %s', info.messageId, info.response);
        return true;
    });
}

var isValidPassword = function (user, password) {
    return bcrypt.compareSync(password, user.password);
}
// Generates hash using bCrypt
var createHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}