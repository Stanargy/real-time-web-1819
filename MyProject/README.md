# Project - 2

## Summary
Background:


Core Features of this project:

multi user chatting
- Storing messages in DB.
- Storing user information in DB.

## Table of contents
1. [Live demo](#1-Live-demo)
2. [Install](#2-Install)
3. [Features](#3-Features)
4. [DATA](#4-DATA)
5. [To-do](#5-To-do)

## 1. Live Demo
The live demo is unavailable at this moment. See to do

## 2. Install
To install this project clone the repository to the local storage on your device. Make sure node.js is installed and open a CLI. Go to the folder which locates the cloned repository and use the command: "npm install". To start a local development service use the command: "npm run dev".

## 3. Features
This project features a real-time chat application. It enables users to login using their google email credentials via the google authentication api (passport). After they are logged in the messages are stored in a mongoDB (mlab).

## 4. Data

Storing Messages:
```js
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
```

Logging in with Google:
```js
// auth with google+

router.get('/google', passport.authenticate('google', {

    scope: ['profile']
    
}));
// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    //  console.log(res.user.username + "-----" + res.user.googleid)
   console.log(newUser)
    //console.log(res)
    //res.send(req.user);
    res.redirect(url.format({
        pathname:"../login",
        query: req.res.user
    }));
    // res.redirect('./views/pages/profile/');
});

```
## 5. To-do
- [X] Setup directories
- [X] Setup socket.io
- [X] return message to DOM
- [X] Integrate unique functionality (login with google)
- [ ] Deploy to heroku: Error on deploy, can't find /app/MyProject/index.js
    looks like heroku by default looks for a /app folder which I don't have
- [ ] render stored messages to DOM
- [ ] multi user functionality
