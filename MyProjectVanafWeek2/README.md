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
6. [Notes](#6-Notes)

## 1. Live Demo
The live demo is unavailable at this moment. See to do

## 2. Install
To install this project clone the repository to the local storage on your device. Make sure node.js is installed and open a CLI. Go to the folder which locates the cloned repository and use the command: "npm install". To start a local development service use the command: "npm run dev".

## 3. Features

- show 
- login with google
- data storage in db

<details></details>

## 4. Data
<details></details>

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
<details>
</details>
[X] Setup directories

#### _________________________________________________

[ ] Change old mongoose message model to new one that matches the input from the api

#### _________________________________________________

[ ] Add new async function on server build:

- [ ] Get All Known Data: From database
- [ ] Get New Data From API, update db
- [ ]  

#### _________________________________________________
[ ] Add New server side async js Function that repeats itself every 2 seconds:
- [ ] Add API data request to api.js
- [ ] Configure data if needed
- [ ] Compare latest 5 objects of old data (in db collection) to new data (from api request) if data is new, create new broadcast message. 
- [ ] add message to collection - broadcast update

#### _________________________________________________


#### Update Client Side:
[ ] Add client side async js function that repeats itself every 2 seconds:

 - [ ] Catch Broadcast From server
 - [ ] Update DOM when new data is received 

[ ] Create Graph that displays the JSON data from the API. SNIPPET: 

```js
<!DOCTYPE HTML>
<html>
<head>
<script>
window.onload = function() {

var dataPoints = [];

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2",
	title: {
		text: "Daily Sales Data"
	},
	axisY: {
		title: "Units",
		titleFontSize: 24
	},
	data: [{
		type: "column",
		yValueFormatString: "#,### Units",
		dataPoints: dataPoints
	}]
});

function addData(data) {
	for (var i = 0; i < data.length; i++) {
		dataPoints.push({
			x: new Date(data[i].date),
			y: data[i].units
		});
	}
	chart.render();

}

$.getJSON("https://canvasjs.com/data/gallery/javascript/daily-sales-data.json", addData);

}
</script>
</head>
<body>
<div id="chartContainer" style="height: 300px; width: 100%;"></div>
<script src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>
<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</body>
</html>

https://canvasjs.com/javascript-charts/json-data-api-ajax-chart/

## 6. Notes
<details>
- 
</details>