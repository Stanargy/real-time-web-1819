const request = require('request')
const fs = require('fs')
const keys = require('../config/keys')

const url = `${keys.api3.apiURL1} +  + ${keys.api3.apiURL2}`

function getAllCoins(thisAllCoins) {
    // delete old data 
    // get the data
    request(url, (error, response, body) => {
        // parse the data
        body = JSON.parse(body)
        // console.log(typeof (body))
    })
}