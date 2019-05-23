'use strict'
// Setup App & express
const path = require('path');
const express = require('express');
const router = require('./router/router')
const app = express()
const http = require('http').Server(app)

// Declare socket api
let io = require('socket.io')(http)


// Declare Socket Function
const socketFunction = require('./source/socketio.js')

const getPriceFunction = require('./source/getPrice.js')

const getAllCoins = require('./source/getAllCoins.js')



// use port 3000 unless there exists a preconfigured port
var PORT = process.env.PORT || 3000;

// Declare keys for api's
const keys = require('./config/keys')

// Declare database api
const mongoose = require('mongoose')

// Declare Authenication api
const cookieSession = require('cookie-session');
const passport = require('passport');


const https = require("https")

// console.log(mongoose.model.toString())
let bodyParser = require('body-parser')

///////////////////////////////////////////////////// get  DB schema's
//     //const userSchema = require('./models/user-model')
const messageSchema = require('./models/message-model')
const thisMessage = mongoose.model('message', messageSchema, 'messages')

// define model for coin price request
const coinSchema = require('./models/coinPrice-model')
const thisCoinPrice = mongoose.model('coinPrice', coinSchema, 'coinPrices')


// define model for allcoins data request
const allCoinsSchema = require('./models/allCoins-model')
const thisAllCoins = mongoose.model('allCoin', allCoinsSchema, 'allCoins')

////////// CONNECT TO MONGODB //////////
mongoose.connect(keys.mongodb.dbURI, {
    useNewUrlParser: true
}, function (err) {
    if (err) throw err;
    
    console.log('Connected to DB');
    
});

let db = mongoose.connection;

// if there is an error connecting to db - log it
db.on('error', console.error.bind(console, 'connection error:'));
////////////////////////////////////////////////////////////////////////////////////////




// log unexpected errors
process.on('uncaughtException', function (err) {
    console.log(err);
});


////////// USE MIDDLEWARE //////////
// setup template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));


// access static file path

app.use(express.static(path.join(__dirname,"public")))

// set cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

//initialize passport (session)
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

////////// USE router FILE TO HANDLE THE REQUESTS
app.use('/', router)





// DATA FUNCTIONS
getAllCoins(thisAllCoins)
socketFunction(io, thisMessage, thisAllCoins)
////////////////////////////////////////



// socketio(http)
// listen to port
http.listen(PORT, function () {
    console.log('PORT ' + PORT + ' || http Server Started')
})




////////////////////////////////////////////////////
////////////// END OF USED CODEC////////////////////
//////////START OF COMMENT SECTION//////////////////
////////////////////////////////////////////////////