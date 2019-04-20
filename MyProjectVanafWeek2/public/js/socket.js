// error msg and username are being flipped around when looking at 2 logged in accounts


let socket = io()

// input & output fields for messages
let myForm = document.querySelector('#form')
let myMessage = document.querySelector('#m')
let myMessages = document.querySelector('#messages')

// interaction updates
let alert = document.querySelector('#alert')
let alertP = document.createElement('P')


// user specific
let thisUsername = document.querySelector('#thisUsername').innerText;


(function(socket){
socket.emit('dataAPI', function(){
  console.log('API called from client')
})
}())
  
// // check for submitting of the form
// myForm.addEventListener('submit', function (e) {
//   e.preventDefault(); // prevents reloading of the page on submit
//   // send message
//   socket.emit('chat message', [myMessage.value, thisUsername]);
//   // send username
//   // empty inputfield
//   myMessage.value = '';
//   return false;
// });



// when new data is being collected do this:?
// check if data is being collected
// myForm.addEventListener('myEvent', function () {
// // add an event to the dom and let this function listen for it?


// })





// Retrieve Data History from server
// socket.on('thisHistory', function (data) {
//   //console.log(data)
//   data.forEach(element => {
//     console.log(element)
//   });
// });



// on message do this
socket.on('new data request from user', function (msg) {
  console.log(msg)
//////////////////////////////////////////////////////
// add graph
///////////////////////////////////////////////////////////

  console.log('message was send')
  //-------------------------------------------------------------Update DOM

})
