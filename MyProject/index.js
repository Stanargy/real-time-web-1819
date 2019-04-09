(function () {

    // declare constants
    const path = require('path');
    const express = require('express');
    const router = require('./router/router')
    const app = express()


    // setup template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));

// access static file path
app.use(express.static('public'));

// use router to handle all requests
app.use('/', router)

 // listen to port
 console.log('PORT 3000 | Server Started')
 app.listen(8080);



}())