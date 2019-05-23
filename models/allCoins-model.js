const mongoose = require('mongoose');


const allCoinsSchema = new mongoose.Schema({
   name: String,
   proofType: String,
   totalSupply: String,
   symbol: String,
   price: String


})


module.exports = allCoinsSchema;