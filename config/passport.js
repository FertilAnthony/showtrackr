// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, next) {
        next(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, next) {
        User.findById(id, function(err, user) {
            next(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, next) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err) return next(err);

                // check to see if theres already a user with that email
                if (user) {
                    console.log('email deja existant');
                    return next(null, false, req.flash('signupMessage', 'Cet email est déjà pris.'));
                } else {

                    // if there is no user with that email
                    // create the user
                    var newUser = new User({
                        // set the user's local credentials
                        name: '',
                        email: email,
                        password: password
                    });

                    // save the user
                    newUser.save(function(err) {
                        if (err) return next(err);
                        return next(null, newUser);
                    });
                }

            });

        });

    }));

};