// error msg and username are being flipped around when looking at 2 logged in accounts


let socket = io()


// input & output fields for messages


// interaction updates
let alert = document.querySelector('#alert')
let alertP = document.createElement('P')


// user specific
let thisUsername = document.querySelector('#thisUsername').innerText;



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

askData(socket)

function askData(socket){

  setInterval(()=>{
    socket.emit('new data request from user')
    console.log('before ')
    // on message do this
    socket.on('newData', function (data) {
     // console.log(data)

      console.log('data above')
  
      
      console.log('message was send')
      templateData(data)
    })


  }, 3000)
}

function templateData(data){
  console.log(data)
  let div = document.querySelector('#dataTable')
  div.innerHTML = '';

  data.forEach((coin) =>{
    let li = document.createElement('li')
    let p1 = document.createElement('p')
    let p2= document.createElement('p')
    let p3 = document.createElement('p')
    p1.innerHTML =  coin.fullname 
    p2.innerHTML =  'From: ' + coin.currencyFrom + 'To: ' + coin.currencyTo  
    p3.innerHTML =  coin.supply
    li.append(p1, p2, p3 )
    div.append(li)

    
    
  })
}



  //////////////////////////////////////////////////////
  // add graph
  ///////////////////////////////////////////////////////////




  //-------------------------------------------------------------Update DOM
