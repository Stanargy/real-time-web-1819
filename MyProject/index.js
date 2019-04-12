
    const Message = require('./models/user-model')
    // declare constants
    const path = require('path');
    const express = require('express');
    const router = require('./router/router')
    const app = express()
    const http = require('http').Server(app)
    let io = require('socket.io')(http)


    const keys = require('./config/keys')
    const mongoose = require('mongoose')
    const cookieSession = require('cookie-session');
    const passport = require('passport');
    const passportSetup = require('./config/passport-setup');

    let bodyParser = require('body-parser')

    // connect to mongodb
    mongoose.connect(keys.mongodb.dbURI, {
        useNewUrlParser: true
    }, function (err) {
        if (err) throw err;

        console.log('Successfully connected to MongoDB' + '\n' + 'Welcome Back :)');

    });

    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

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

    // use router to handle all requests
    app.use('/', router)

    // setup socket.io
    io.on('connection', function (socket) {
        console.log('a user connected');


        socket.on('disconnect', function () {
            console.log('user disconnected');
        });


        socket.on('chat message', function (msg) {
            console.log('message: ' + msg);
            console.log('db opened')
                if(msg!=''){   
                    let nMessage = new Message({
                        user: 'testuser',
                        body: msg,
                        date: new Date()
                    });

                     nMessage.save()
                    console.log('new doc saved')   
                    
                   
                }

            io.emit('chat message', msg)
        });
    });







    // listen to port
    http.listen(3000, function () {
        console.log('PORT 3000 | http Server Started')
    })




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