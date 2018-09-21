var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file

function verifyToken(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];
  var string = req.route.path+"";
  if (!token) {
    if(req.route.path.includes("/contest/") || req.route.path.includes("/contest")){
      return res.redirect('/login');
    } else {
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
  }
    

  // verifies secret and checks exp
  jwt.verify(token, 'FanKick', function(err, decoded) {      
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.',data:err});    

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;