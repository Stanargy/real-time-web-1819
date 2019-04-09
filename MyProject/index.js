(function () {

    // declare constants
    const path = require('path');
    const express = require('express');
    const router = require('./router/router')
    const app = express()
    const io = require('../../')(server);


    // setup template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));

// access static file path
app.use(express.static('public'));

// use router to handle all requests
app.use('/', router)

 // listen to port
 console.log('PORT 3000 | Server Started')
 app.listen(3000);

// chat

let numUsers = 0;

io.on('connection', (socket) =>{
    let addedUser = false;

    // when the client emits a new message, this block listens and executes
    socket.on('new message', (data) =>{
        // tell the client to execute new message
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) =>{
        if (addedUser) return;

        // store username in socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers

        });
    });

    // when client starts typing we broadcast it to others
    socket.on('typing', ()=>{
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when client stops typing we broadcast it to the user
    socket.on('stop typing', () =>{
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // whem the user disconnects.. perform this block of code:
    socket.on('disconnect', () =>{
        if (addedUser) {
            --numUsers;

            // echo globally that this client has left

            socket.breadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});

}())