const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    socketID: String,
    userName: String,
    body: String,
    date: String
})


module.exports = messageSchema;