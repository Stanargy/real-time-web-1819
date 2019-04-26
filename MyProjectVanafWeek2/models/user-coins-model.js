const mongoose = require('mongoose');

const userCoin= new mongoose.Schema({
    username: String,
    googleid: String,
    gender: String,
    thumbnail: String,
    favorites: Array
});


const userCoins = mongoose.model('userCoin', userCoin, 'userCoins');
module.exports = userCoins;

