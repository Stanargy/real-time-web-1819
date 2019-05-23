// error msg and username are being flipped around when looking at 2 logged in accounts

(function () {

  let socket = io()
  let allCoinData;

  // input & output fields for messages
  // user specific
  let thisUsername = document.querySelector('#thisUsername').innerText;
  let favoriteSection = document.querySelector('#favoriteSection')


  askData(socket)

  function askData(socket) {

    setInterval(() => {
      socket.emit('new data request from user')

      // on message do this
      socket.on('newData', function (data) {
        // console.log(data)  
        console.log('message was send')
        templateData(data)
      })



    }, 5000)
  }

  socket.on('allcoins', (data) => {
    templateAllCoins(data);
  })

  ////// add allcoins to dom

  function templateAllCoins(data) {
    if (data != null) {

      allCoinData = data

      console.log('Allcoin Data Retrieved, ready to search')
    }
  }


  ///////////////////////////// update data in DOM:
  function templateData(data) {
    //console.log(data)
    let left = 0;
    let div = document.querySelector('#wrapper')

    if (data.length > 7) {
      div.innerHTML = '';


      // if the data contains info about at least 5 coins: update DOM!

      // foreach coin in data (array) do:
      data.forEach((coin) => {

        // select target elements
        let card = document.createElement('article')
        card.setAttribute('class', 'coinCard')
        card.setAttribute('class', 'logo')
        let name = document.createElement('p')
        name.setAttribute('class', 'coinItem')

        let cFromTo = document.createElement('p')
        cFromTo.setAttribute('class', 'coinItem')
        let proofType = document.createElement('p')
        proofType.setAttribute('class', 'coinItem')
        let supply = document.createElement('p')
        supply.setAttribute('class', 'coinItem')

        //console.log(card)

        // define the data that needs to be put in the elements
        name.innerText = coin.fullname;
        proofType.innerText = `Proof Type: ${coin.proofType}`
        cFromTo.innerText = coin.currencyFrom + ' / ' + coin.currencyTo;

        supply.innerText = `Supply: ${coin.supply}`;

        // append elements to main div
        card.append(name, cFromTo, proofType, supply)
        div.append(card)

        // add card layout:
        card.style.left = `${left}vw`
        card.style.border = 'solid 1px black'
        left += 20

      })
    }
  }

  //-------------------------------------------------------------END OF Update DOM




  /// search query 

  let searchInput = document.querySelector('#searchField')
  let coinQuery = [];
  let updateField = document.querySelector('#queryUpdate')
  const thisUser = document.querySelector('#thisUsername').innerText



  searchInput.addEventListener('input', async () => {

    coinQuery = [];
    updateField.innerHTML = '';


    //console.log(coinQuery)
    await allCoinData.forEach((item) => {

      // check if any item in data matches the search input

      if (item.name.toLowerCase().includes(searchInput.value.toLowerCase()) && coinQuery.length < 10 && searchInput.value.length >= 3) {
        coinQuery.push(item)
        // update the DOM for Query (ASYNC)
        let index = 0;
        updateForQuery(item)
      }
    })
    socket.emit('newSearch', coinQuery)
  });



  // update DOM for searchQuery

  async function updateForQuery(coin) {
    await updator(coin)

    function updator(coin, checkboxes) {
      return new Promise((resolve, reject) => {
        updateField.innerHTML +=

          `<div>
      <p>${coin.name}</p>
      <input type="checkbox" id="addToFavorites${coin._id}" name="" value=""></input>
      </div`

        resolve(coin._id)

      }).then((coinID) => {
        checkboxes = document.querySelector(`#addToFavorites${coinID}`)
        checkboxes.addEventListener('change', (event) => {

          // if user wants to add to favorite list / checkbox: checked
          if (event.target.checked) {

            // use the username that was rendered to the DOM to locate the user in the dataBase
            let message = {
              thisUser: thisUser,
              coinID: coinID
            }
            socket.emit('addToFavorite', message)
            
          } else {
            // delete from favorite list / checkbox: unchecked
            let message = {
              thisUser: thisUser,
              coinID: coinID
            }
            socket.emit('deleteFavorite', message)
            updateFavorites()
          }
        })
      })
    }

  }


  function updateFavorites(){
    // send requst to find favorites in database and use thisUser to do it
    socket.emit('requestFavorites', thisUsername, ()=>{
      favoriteSection.innerHTML = '';
    })

    // On Retrievement of favorite Selection: Add to DOM
  socket.on('newFavorite', (favorite) => {
    console.log(favorite)
    if(favorite){
      favoriteSection.innerHTML += `
      <div class="favorite">
      <p>${favorite.name}</p>
      <p>Total Supply = ${favorite.totalSupply}</p>
      <p>Total Proof Type = ${favorite.proofType}</p>
      <p id="price"></p>
      </div>
      `
      
    }
  })
}
  


// Retrieve New Price and update DOM
  socket.on('priceSet',(res)=>{
    let price = document.querySelector('#price')
    price.innerText = JSON.stringify(res)
  })


}())