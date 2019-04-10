console.log('js added')
let socket = io()


let myForm = document.querySelector('#form')
let myMessage = document.querySelector('#m')
let myMessages = document.querySelector('#messages')
let alert = document.querySelector('#alert')
let alertP = document.createElement('P')

myForm.addEventListener('submit', function(e){
      e.preventDefault(); // prevents reloading of the page on submit
        socket.emit('chat message', myMessage.value);
        myMessage.value = '';
        return false;
});
socket.on('chat message', function(msg){
  console.log(typeof(msg))

  if(msg === ''){
    alertP = 'No message was send, because it was empty...'
    alert.innerHTML = alertP;


  } else{
    let newMessage = document.createElement('li')
    newMessage.innerText = msg;
    // delete 'empty message not send' alert
    if(alertP.innerText != ""){
      alert.parentNode.removeChild(alert)
      alertP = "";
    }
    myMessages.append(newMessage)
  
    

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


