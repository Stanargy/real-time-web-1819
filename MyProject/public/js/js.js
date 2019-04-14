console.log('js added')
let socket = io()


let myForm = document.querySelector('#form')
let myMessage = document.querySelector('#m')
let myMessages = document.querySelector('#messages')
let alert = document.querySelector('#alert')
let alertP = document.createElement('P')




// check for submitting of the form
myForm.addEventListener('submit', function (e) {
  e.preventDefault(); // prevents reloading of the page on submit
  socket.emit('chat message', myMessage.value);
  myMessage.value = '';
  return false;
});



// check if this user is typing
myForm.addEventListener('keydown', function () {
  thisUsername = document.querySelector('#thisUsername').innerText
  console.log(socket)

  socket.emit('isTyping', `${thisUsername} is typing...`, socket.id )
})


// when someone is typing do this
socket.on('someoneIsTyping', function(data, socketid){
  const isTypingAlert = document.createElement('p')
  isTypingAlert.innerText = data
  let alert2 = document.querySelector('#alert2')
  // console.log(socketid)
  // console.log(socket.id)

  // if the alertbox is still empty, we fill it with the istyping alert
  if(alert2.innerText === '' && socketid != socket.id){
    alert2.append(isTypingAlert)
  }
})

// Retrieve chat History from server
socket.on('chatHistory', function (data) {
  //console.log(data)
  data.forEach(element => {
    let previousMessage = document.createElement('li')
    previousMessage.innerText = element.body
    myMessages.append(previousMessage)
  });
});



// on message do this
socket.on('chat message', function (msg) {

  //-------------------------------------------------------------Update DOM

  // if the message was empty. add status update to DOM
  if (msg === '') {
    alertP = 'No message was send, because it was empty...'
    alert.innerHTML = alertP;

    // if the message is not empty create element and add it to DOM
  } else {
    let newMessage = document.createElement('li')
    newMessage.innerText = msg;


    // delete 'empty message not send' alert, if new message is not empty
    if (alertP.innerText != "") {
      alert.parentNode.removeChild(alert)
      alertP = "";
    }


    myMessages.append(newMessage)

    // can send a message
    // empty message
    // send message
    // send message (error)    

  }
})







// (function(){
//     const FADE_TIME = 150; //ms
//     const TYPING_TIMER_LENGTH = 400; //ms
//     const COLORS = [
//     '#e21400', '#91580f', '#f8a700', '#f78b00',
//     '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
//     '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
// ];

// // initialize variables

//     var thisWindow = document.querySelector('window')
//     console.log(thisWindow);
// }())