'use strict'

////////// In this file I open a socket.io connection, send and receive messages 
////////// And call the save to db function for the message that was send
//////////
//////////
// const http = require('../index.js')
// // Declare socket api
// let io = require('socket.io')(http)

// Declare database api
//const mongoose = require('mongoose')

//     // get  DB schema's
//     //const userSchema = require('./models/user-model')
//const messageSchema = require('../models/message-model')

//     // set DB models
//    // const User = mongoose.model('User', userSchema, 'users');
//const thisMessage = mongoose.model('message', messageSchema, 'messages')



// Declare Socket Function
module.exports = function socketFunction(io, thisMessage){ 


////////// SOCKET IO CODE //////////
// setup socket.io
io.on('connection', function (socket) {
    console.log('a user connected');
    console.log(socket.id + '  = socket id')
    
        
        // Chathistory database connection + bind to variable
        let chatHistory = thisMessage.find({}, function(error, documents){
            //console.log(documents)
            socket.emit('chatHistory', documents);
        })
        // DOM update on 'typing' input from user
        socket.on('isTyping', function(data, socketid){

            // send DOM Manipulation
            socket.emit('someoneIsTyping', data, socketid)
        })


        // Send user disconnected log + socket.id
        socket.on('disconnect', function () {
            console.log('user disconnected');
            console.log(socket = ' = socket ' );
        });
        

        // When a message is send do this:

           socket.on('chat message', function (data) {
            let msg = data[0]
            let username = data[1]

            // if the message is not empty (''),  store it in an object
                    if(msg!=''){   
                let nMessage = new thisMessage({
                    socketID: socket.id,
                    userName: username,
                    body: msg,
                    date: new Date()
                    
                })


                // save the object in the database || store document in collection messages
                function saveMessage(){
                    nMessage.save()
                    console.log('Message Stored')
                } 
                saveMessage()
                io.emit('chat message', nMessage)
                
            }

            // send chatmessage to the other users
        });


    });

}
//socketFunction()


// console.log(module)