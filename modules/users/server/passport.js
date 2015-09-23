'use strict';

/**
 * Module dependencies.
 */
var 
      JwtStrategy = require('passport-jwt').Strategy,
      User          = require('../models/user.schema');

var opts = {}
opts.secretOrKey = 'shhhhhh';
opts.issuer = "lukundu.net/api/auth";
opts.audience = "lukundu.net";


module.exports = function(passport) {
// Use local strategy
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account 
        }
    });
  }));
}