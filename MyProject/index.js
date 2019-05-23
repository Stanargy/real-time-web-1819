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






// use port 3000 unless there exists a preconfigured port
var PORT = process.env.PORT || 3000;

// Declare keys for api's
const keys = require('./config/keys')

// Declare database api
const mongoose = require('mongoose')

// Declare Authenication api
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');


// console.log(mongoose.model.toString())
let bodyParser = require('body-parser')

let thisUser = require('./config/passport-setup')

//     // get  DB schema's
//     //const userSchema = require('./models/user-model')
const messageSchema = require('./models/message-model')

//     // set DB models
//    // const User = mongoose.model('User', userSchema, 'users');
const thisMessage = mongoose.model('message', messageSchema, 'messages')

//     // export User to use in passport-setup
//     //module.exports = User;
//     let x = messageSchema
//     console.log(x)
//     console.log('---')


// module.exports = messageSchema, thisMessage

////////// CONNECT TO MONGODB //////////
mongoose.connect(keys.mongodb.dbURI, {
    useNewUrlParser: true
}, function (err) {
    if (err) throw err;
    
    console.log('Connected to DB');
    
});

let db = mongoose.connection;

//console.log(db)

db.on('error', console.error.bind(console, 'connection error:'));







////////// USE MIDDLEWARE //////////
// setup template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));

// access static file path
app.use(express.static('public'));

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

////////// USE router FILE TO HANDLE TE REQUESTS
app.use('/', router)


// This export is used by the socket.io ./source file
// module.exports = http
console.log(typeof(socketFunction))
socketFunction(io, thisMessage)
// socketio(http)
// listen to port
http.listen(PORT, function () {
    console.log('PORT ' + PORT + ' || http Server Started')
})











////////////////////////////////////////////////////
////////////// END OF USED CODEC////////////////////
//////////START OF COMMENT SECTION//////////////////
////////////////////////////////////////////////////

// chat

// let numUsers = 0;

// io.on('connection', (socket) =>{
//     let addedUser = false;

//     // when the client emits a new message, this block listens and executes
//     socket.on('new message', (data) =>{
//         // tell the client to execute new message
//         socket.broadcast.emit('new message', {
//             username: socket.username,
//             message: data
//         });
//     });

//     // when the client emits 'add user', this listens and executes
//     socket.on('add user', (username) =>{
//         if (addedUser) return;

//         // store username in socket session for this client
//         socket.username = username;
//         ++numUsers;
//         addedUser = true;
//         socket.emit('login', {
//             numUsers: numUsers

//         });
//     });

//     // when client starts typing we broadcast it to others
//     socket.on('typing', ()=>{
//         socket.broadcast.emit('typing', {
//             username: socket.username
//         });
//     });

//     // when client stops typing we broadcast it to the user
//     socket.on('stop typing', () =>{
//         socket.broadcast.emit('stop typing', {
//             username: socket.username
//         });
//     });

//     // whem the user disconnects.. perform this block of code:
//     socket.on('disconnect', () =>{
//         if (addedUser) {
//             --numUsers;

//             // echo globally that this client has left

//             socket.breadcast.emit('user left', {
//                 username: socket.username,
//                 numUsers: numUsers
//             });
//         }
//     });
// });