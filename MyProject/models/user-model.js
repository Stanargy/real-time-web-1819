const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    googleid: String,
    gender: String,
    thumbnail: String
});


const User = mongoose.model('User', userSchema, 'users');
module.exports = User;





// module.exports = userSchema 
// console.log(User)
//console.log(userSchema)

  
// let message1 = new Schema({ user:'example', body: 'bodyExample', email: 'example@foo.com' })