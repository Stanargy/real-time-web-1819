'use strict'

// Declare Socket Function
module.exports = async function socketFunction(io, thisMessage, thisAllCoins) {



    //API Call
    let oldData = {};
    let newData = 'default';
    let oldNew = false;

    const https = require('https')
    const keys = require('../config/keys')

    let User = require('../models/user-model')

    const request = require('request')


    // url for general supply info of 10 coins
    const url1 = keys.api2.apiURL + keys.apiGraphData.apiPrefix

    // url for specific coin markt cap info
    let thisCoin = 'BTC';
    let url2 = keys.api3.apiURL1 + thisCoin + keys.api3.apiURL2;

    let totalData = [];


    await dataRequest((data) => {})


    function dataRequest() {
        setInterval(() => {
            https.get(url1, res => {
                res.setEncoding("utf8");
                //console.log(res)
                res.on("data", data => {

                    data = JSON.parse(data)
                    newData = data
                    oldData = newData
                    setModal(oldData, newData)


                });
                res.on("end", (res) => {
                    console.log('new data received and saved')
                })
            })
        }, 5000)

    }





    function setModal(oldData, newData) {
        // console.log(newData)
        // console.log(oldData)
        let storingData;
        totalData = [];
        if (oldData === newData) {
            oldNew = true;

            // modal every item (take what is usefull)
            for (let x = 0; x < newData.Data.length; x++) {
                let root = newData.Data[x]
                storingData = new thisMessage({
                    name: root.CoinInfo.Id,
                    fullname: root.CoinInfo.FullName,
                    imageUrl: root.CoinInfo.ImageUrl,
                    currencyFrom: root.ConversionInfo.CurrencyFrom,
                    currencyTo: root.ConversionInfo.CurrencyTo,
                    totalVolume24h: root.ConversionInfo.TotalVolume24H,
                    supply: root.ConversionInfo.Supply,
                    proofType: root.CoinInfo.ProofType

                })
                //Delete old DB documents
                thisMessage.deleteMany({}, () => {
                    // console.log('cleared old document')
                    totalData.push(storingData)

                    //console.log('saved new document')
                })
                storingData.save()



            }


        } else {
            console.log('no new data was found')

        }
    }





    // ////////////////////////////////////////////////////////////
    // /// add API Requests that looks for a boolean value to be true and then renders most recent history that is stored in a variable
    // ///  
    // /// Also Adds it to a model as code below:
    // // and saves it to the database as below:
    // ///////////////////////////////////////////

    ////////// SOCKET IO CODE //////////
    // setup socket.io
    io.on('connection', function (socket) {
        console.log('a user connected');
        console.log(socket.id + '  = socket id')


        // Send user disconnected log + socket.id
        socket.on('disconnect', function () {
            console.log('user disconnected');

        });

        // When a message is send do this:
        socket.on('new data request from user', function () {
            let history = thisMessage.find({}, function (error, documents) {
                socket.emit('newData', documents)
            })


        });

        socket.on('newSearch', (coinQuery) => {
            // console.log(coinQuery)
        })

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

        socket.on('deleteFavorite', (message) => {
            // get user
            let getUser = User.findOne({
                username: `${message.thisUser}`
            }, (error, documents) => {
                let thisArray = documents.favorites
                let newArray = []
                thisArray.filter((value) => {

                    if (value != message.coinID) {
                        newArray.push(value)
                        console.log(value)
                    }
                    return newArray
                })
                User.updateOne({
                    username: `${message.thisUser}`
                }, {
                    $set: {
                        favorites: newArray
                    }
                    //favorites: [thisFavorites]
                }, () => {
                    console.log(newArray.length)
                    console.log(`successfully deleted a coinID from favourites`)
                })
            })

        })

        let allcoins = thisAllCoins.find({}, function (error, documents) {


            // send all coins to the client
            socket.emit('allcoins', documents)
        })
        // look for this users favourites
        socket.on('requestFavorites', (thisUser) => {
            User.findOne({
                username: `${thisUser}`
            }, (error, documents) => {
                console.log('requestFavorites')
                // console.log('documents')
                console.log(documents.favorites)
                console.log(`\n`);
                console.log(`\n`)




                let thisFavorites = documents.favorites
                for (let i = 0; i < thisFavorites.length; i++) {

                    console.log(thisFavorites[i])
                    console.log(typeof (thisFavorites[i]))
                    // find correct symbol
                    //console.log('favourite individual coin:')

                    // search through allCoins to find the one that has id matching the id from the user

                    thisAllCoins.findById({
                        _id: thisFavorites[i]
                    }, (error, document) => {
                        console.log(document)
                        if (error) {
                            console.log(error + ' | ERROR. Could not find matching ID  during find by id: favorite-id-from-user')
                        } else {

                            if (document != null) {


                                let thisSymbol = document.symbol
                                console.log(thisSymbol)

                                // send fullCoin to Client
                                socket.emit('newFavorite', document)

                                // create request-url for prices
                                let thisUrl = keys.api3.apiURL1 + thisSymbol + keys.api3.apiURL2 + keys.apiGraphData.apiPrefix
                                // Call Price Update API request

                                
                                setPrices(thisUrl, document.symbol)
                            } else {
                                console.log(`No Favorites found in the Database. document = ${document}`)
                                console.log(`\n`)
                            }

                        }
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
                    })

                    /// ERROR Socket ONLY LOADSIN The Documents That Have Been Seleced By user During Build



                    // create url

                    // get the data
                    // request(url, (error, response, body) => {
                    //     // parse the data
                    //     body = JSON.parse(body)
                    // })
                }
            })
        })
    });


}