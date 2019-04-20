'use strict'

// Declare Socket Function
module.exports = function socketFunction(io, thisMessage) {



    //API Call
    let oldData = {};
    let getData = async function () {
        return new Promise((resolves, rejects) => {

            // get toplist by volume in EUR
            const keys = require('../config/keys')
            const https = require('https')
            let url = keys.api2.apiURL + keys.apiGraphData.apiPrefix

            // API Request And define Data object
            https.get(url, res => {
                res.setEncoding("utf8");
                let newData = "";
                res.on("data", data => {
                    newData += data
                });
                res.on("end", () => {
                    newData = JSON.parse(newData);

                    console.log(newData.Data.length)
                    newData.Data.forEach((data)=>{

                     
                            let storingData = new thisMessage({
                                name: data.CoinInfo.Id,
                                fullname: data.CoinInfo.FullName,
                                imageUrl: data.CoinInfo.ImageUrl,
                                currencyFrom: data.ConversionInfo.CurrencyFrom,
                                currencyTo: data.ConversionInfo.CurrencyTo,
                                totalVolume24h: data.ConversionInfo.TotalVolume24H,
                                supply: data.ConversionInfo.Supply,
                                proofType: data.CoinInfo.ProofType
    
                            })
                                // Save To database
                                    storingData.save()
                        
                    })




                    // ////////////////////////////////////////////////////////////
                    // /// add API Requests that looks for a boolean value to be true and then renders most recent history that is stored in a variable
                    // ///  
                    // /// Also Adds it to a model as code below:
                    // // and saves it to the database as below:
                    // ///////////////////////////////////////////
                    // // replace old data if there is new data
                    // if (newData !== oldData) {
                    //     oldData === newData;



                    //     // save the object in the database || store document in collection messages
                    //     saveData()
                    //     io.emit('chat message', nMessage)

                    // }




                })

            })
        })
    }
    getData()



    ////////// SOCKET IO CODE //////////
    // setup socket.io
    io.on('connection', function (socket) {
        console.log('a user connected');
        console.log(socket.id + '  = socket id')


        //        Chathistory database connection + bind to variable
        // let History = thisMessage.find({}, function(error, documents){
        //     //console.log(documents)
        //     socket.emit('thisHistory', documents);
        // })





        // Send user disconnected log + socket.id
        socket.on('disconnect', function () {
            console.log('user disconnected');
            console.log(socket = ' = socket ');
        });





        // When a message is send do this:
        socket.on('new data request from user', function (data) {});


    });

}