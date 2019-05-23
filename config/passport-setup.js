const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model')
const mongoose = require('mongoose')
//console.log(User)
//console.log(mongoose.model + 'at passport setup')
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });

});


passport.use(

    new GoogleStrategy({

        // options for google strategy

        clientID: keys.google.clientID,

        clientSecret: keys.google.clientSecret,

        callbackURL: '/google/redirect'

    }, (accessToken, refreshToken, profile, done) => {
        // check if user allready exists in our db
        // console.log(profile);
        //console.log(profile)
        User.findOne({
            googleid: profile.id
        }).then((currentUser) => {
            if (currentUser) {
                //console.log('user is: ', currentUser);
                done(null, currentUser);
                //already have the user
            } else {
                //if not, create user in our db
                let thisUser = new User({
                        username: profile.displayName,
                        googleid: profile.id,
                        gender: profile.gender,
                        thumbnail: profile._json.image.url,
                        favorites: ['']
                    })

                    // select the right collection and save the user in the database
                    // pseudocode: mongoose.model(modelname).save()??   

                      .save()
                        

                    .then((newUser) => {
                        console.log('new user Created:' + newUser);
                        //console.log(profile)
                        done(null, newUser);
                        //     let thisUser = profile
                        //    module.exports = thisUser
                    });
            }
        });
    })
)