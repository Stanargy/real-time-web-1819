# Project - 2

## Summary

Background:
- This project features a real-time-web example that focusses on retrieving cryptocurrencies from an external API and then querying that API again on interval retrieve new data relevant for the cryptocurrencies selected by the user.

Core Features of this project:

- Store User data
- Update the user in the database with their selected favourite cryptocurrencies
- Render price changes regarding those cryptocurrencies  

## Table of contents

1. [Live demo](#1-Live-demo)
2. [Install](#2-Install)
3. [Features](#3-Features)
4. [DATA](#4-DATA)
5. [API](#5-API)
5. [To-do](#5-To-do)

## 1. Live Demo

The live demo is unavailable at this moment. See to do

## 2. Install

To install this project clone the repository to the local storage on your device. Make sure node.js is installed and open a CLI. Go to the folder which locates the cloned repository and use the command: "npm install". To start a local development service use the command: "npm run dev".

## 3. Features


- Login with google
- Create a new user and store it to mongodb
- Storage in mongodb
- Add cryptocurrency to a list of favourites (&& update the User in the mongodb)
- Show price changes for those favourites in real-time

Data live cycle:
<details>

</details>

## 4. Data

- Add to Favourites

<details>
```js
socket.on('addToFavorite', (message) => {
    console.log(message)

            ///////////////////////////////////////////////////////get user, add favorites to favorite property

            // get user
            let getUser = User.findOne({
                username: `${message.thisUser}`
            }, (error, documents) => {

                let thisArray = [];
                // add new favorite coin ID to array: thisFavorites
                thisArray.push(message.coinID)
                // for each favorite that was already existing add to Array: thisFavorite
                documents.favorites.forEach(document => {
                    thisArray.push(document)
                })

                // remove the "" (default) value in the array
                let thisFavorites = thisArray.filter((value) => {
                    if (value != "")
                        return value
                })

                // remove duplicates
                thisFavorites = [...new Set(thisFavorites)]
                console.log(thisFavorites.length)
                // add new favorites array (thisFavorites) to the user property: favorites
                User.updateOne({
                    username: `${message.thisUser}`
                }, {
                    $set: {
                        favorites: thisFavorites
                    }
                    //favorites: [thisFavorites]
                }, () => {
                    console.log('succesfully updated a profile with a new coinID')
                })
            })
        })
    ```

</details>

- new data request from the user:
<details>

```js
 // look for this users favourites
        socket.on('requestFavorites', (thisUser) => {
            User.findOne({
                username: `${thisUser}`
            }, (error, documents) => {
                console.log('requestFavorites')
                console.log('documents')
                //console.log(documents)



                let thisFavorites = documents.favorites
                thisFavorites.forEach(favorite => {



                    // find correct symbol
                    console.log('favourite individual coin:')
                    favorite = favorite.toString()

                    console.log(favorite)
                    console.log(typeof (favorite))
                    // search through allCoins to find the one that has id matching the id from the user

                    thisAllCoins.findById(favorite, (error, document) => {

                        // send fullCoin to Client
                        socket.emit('newFavorite', document)
                        console.log(document)
                        console.log('-----------------------------------')

                        let thisSymbol = document.symbol
                        console.log(thisSymbol)

                        let thisUrl = keys.api3.apiURL1 + thisSymbol + keys.api3.apiURL2 + keys.apiGraphData.apiPrefix
                        console.log(thisUrl)
                        setPrices(thisUrl, document.symbol)

```
</details>

- Retrieve new Price Data
<details>

```js
    async function setPrices(url, symbol) {

                            setInterval(() => {

                                thisRequest(url, symbol)

                                function thisRequest(url, symbol) {
                                    return new Promise((resolve, reject) => {
                                        // get the data
                                        request(url, (error, response, body) => {
                                            // parse the data
                                            body = JSON.parse(body)

                                            resolve(body)
                                        })
                                    }).then((res) => {

                                        thisAllCoins.updateOne({
                                            Symbol: symbol
                                        }, {
                                            $set: {
                                                price: res
                                            }

                                        }, () => {
                                            console.log(`succesfully updated price in DB`)
                                        })
                                        socket.emit('priceSet', res)


                                    })
                                }
                            }, 2000)
                        }
```
</details>

- Logging in with Google:

<details>

```js

// auth with google+

router.get('/google', passport.authenticate('google', {

    scope: ['profile']

}));
// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
// console.log(res.user.username + "-----" + res.user.googleid)
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
</details>
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
[X] Add New server side async js Function that repeats itself every 2 seconds:
- [X] Add API data request to api.js
- [X] Configure data if needed
- [X] Send a message with the new data to the client

#### _________________________________________________


#### Update Client Side:
[ ] Add client side async js function that repeats itself every 2 seconds:

 - [X] Catch Message From server
 - [X] Update DOM when new data is received

- [ ] Create Graph that displays the JSON data from the API. SNIPPET:

<details>

```html

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

```
</details>

## 6. API


- To create this project the Cryptocompare API has been used:
https://min-api.cryptocompare.com/
<details>


</details>

