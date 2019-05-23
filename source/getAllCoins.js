// this file regulates the function that retrieves all coins

const request = require('request')
const fs = require('fs')
const keys = require('../config/keys')

const url = keys.api4.apiURL1


module.exports = function getAllCoins(thisAllCoins) {
    // delete old data 
    thisAllCoins.deleteMany({}, () => {
        // console.log(JSON.stringify(data))
    })
    // get the data
    request(url, (error, response, body) => {
        // parse the data
        body = JSON.parse(body)
        // console.log(typeof (body))
        
        
        // make an array from the data object
        //set data to model + delete old data + save new data to db
        body = Object.values(body.Data)
        // console.log(Array.isArray(body))



       

        body.forEach((coin, i) => {
            let data = new thisAllCoins({
                name: coin.FullName,
                proofType: coin.ProofType,
                totalSupply: coin.TotalCoinSupply,
                symbol: coin.Symbol,
                price: ''
            })
            data.save()


        })
        console.log("JSON file has been saved.");

    })

}