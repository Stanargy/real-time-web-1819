'use strict'

// Declare Socket Function
module.exports = async function socketFunction(io, thisMessage) {



    //API Call
    let oldData = {};
    let newData = 'default';
    let oldNew = false;

    const https = require('https')
    const keys = require('../config/keys')
    const url = keys.api2.apiURL + keys.apiGraphData.apiPrefix

    let totalData = [];


    await dataRequest((data) => {})


    function dataRequest() {
        setInterval(() => {
            https.get(url, res => {
                res.setEncoding("utf8");
                //console.log(res)
                res.on("data", data => {

                    data = JSON.parse(data)

                    console.log('first')
                    newData = data
                    oldData = newData
                    setModal(oldData, newData)



                });
                res.on("end", (res) => {
                    // console.log(newData)
                    //newData = JSON.parse(newData)
                    console.log('second')

                })



            })

        }, 4000)



        // .then((res)=>{

        //     console.log(res)
        //     console.log('.then')


        // })

    }

    // let getData = async function (oldData, newData) {
    //     console.log('....')





    // }




    // get toplist by volume in EUR

    // API Request And define Data object


    // getData(oldData, newData, ()=>{
    //     setModal(oldData, newData)
    //     console.log('got data and stored it')
    // })


    function setModal(oldData, newData) {
        console.log(newData)
        // console.log(oldData)
        let storingData;
        totalData = [];
        if (oldData === newData) {
            oldNew = true;
            console.log('same')
            // console.log(newData.Data)
            //  console.log(newData.Data[0])
            for (let x = 0; x < newData.Data.length; x++) {
                let root = newData.Data[x]
                storingData = new thisMessage({
                    name: root.CoinInfo.Id,
                    fullname: root.CoinInfo.FullName,
                    imageUrl: root.CoinInfo.ImageUrl,
                    currencyFrom: root.ConversionInfo.CurrencyFrom,
                    currencyTo: root.ConversionInfo.CurrencyTo,
                    totalVolume24h: root.ConversionInfo.TotalVolume24H,
                    supply: root.ConversionInfo.Supply,
                    proofType: root.CoinInfo.ProofType

                })
                //Delete old DB documents
                thisMessage.deleteMany({}, () => {
                    // console.log('cleared old document')
                    totalData.push(storingData)

                    // console.log(storingData[0])

                    //console.log('saved new document')
                })
                storingData.save()



            }
            //console.log(newData)
            //console.log(newData.Data.length)
            // newData.Data.forEach((data) => {


            // })
            // clear collection from old documents
            //     // Save To database
            //     storingData.save()


            // })

            //  socket.emit('newData Found')


        } else {
            console.log('no new data was found')

        }
    }





    // ////////////////////////////////////////////////////////////
    // /// add API Requests that looks for a boolean value to be true and then renders most recent history that is stored in a variable
    // ///  
    // /// Also Adds it to a model as code below:
    // // and saves it to the database as below:
    // ///////////////////////////////////////////
    // // replace old data if there is new data
    // if (newData !== oldData) {
    //     oldData === newData;



    //     // save the object in the database || store document in collection messages
    //     saveData()
    //     io.emit('chat message', nMessage)

    // }




    ////////// SOCKET IO CODE //////////
    // setup socket.io
    io.on('connection', function (socket) {
        console.log('a user connected');
        console.log(socket.id + '  = socket id')


        //        Chathistory database connection + bind to variable
        // let History = thisMessage.find({}, function(error, documents){
        //     //console.log(documents)
        //     socket.emit('thisHistory', documents);
        // })





        // Send user disconnected log + socket.id
        socket.on('disconnect', function () {
            console.log('user disconnected');
     
        });





        // When a message is send do this:
        socket.on('new data request from user', function () {
            let history = thisMessage.find({}, function(error, documents){
                socket.emit('newData', documents)
            })

        });


    });
}