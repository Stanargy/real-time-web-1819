const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: String,
    body: String,
    date: String
})
const Message = mongoose.model('message', messageSchema)

module.exports = Message;