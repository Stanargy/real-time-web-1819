const express = require('express');
const router = express.Router();
const passport = require('passport')
const bodyParser = require('body-parser')
let newUser = require('../config/passport-setup');
const mongoose = require('mongoose')
let Message = require('../models/user-model')

const url = require('url')
const authCheck = (req, res, next) =>{
    if(!req.user){
        // if user is not logged in:
        res.redirect('/google');
    } else{
        //if logged in
        next();
    }
};



let {
    index,
    detail,
    profile
} = require('../controller/indexController');


router.get('/', authCheck, index)
router.get('/=:id', detail)
// router.get('/profile', profile)

// -------------------------------------------- auth routes
// auth login
router.get('/login', (req, res) => {
    // console.log(req.user)
    
    res.render('profile.ejs', {
        user: req.user
    });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport

    req.logout();
    res.redirect('/');
});

// auth with google+

router.get('/google', passport.authenticate('google', {

    scope: ['profile']
    
}));
// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    //  console.log(res.user.username + "-----" + res.user.googleid)
   //console.log(res)

   let allMessages = Message.find({}, (res) =>{
       console.log(res)
   })
    res.redirect(url.format({
        pathname:"../login",
        query: req.res.user

    }));
    // res.redirect('./views/pages/profile/');
});





// --------------------------------- post routes

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
router.post('/login', urlencodedParser, function (req, res) {
  console.log(res)
});



module.exports = router;