const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    googleid: String,
    gender: String,
    thumbnail: String
});

const User = mongoose.model('user', userSchema);

const messageSchema = new mongoose.Schema({
    user: String,
    body: String,
    date: String
})
const Message = mongoose.model('message', messageSchema)

module.exports = Message, User;


  
// let message1 = new Schema({ user:'example', body: 'bodyExample', email: 'example@foo.com' })