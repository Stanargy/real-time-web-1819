const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    name: String,
    fullname: String,
    imageUrl: String,
    currencyFrom: String,
    currencyTo: String,
    totalSupply24h: String || int,
    supply: String || int,
    proofType: String || int
})


module.exports = messageSchema;