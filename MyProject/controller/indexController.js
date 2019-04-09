

// This is returned to route!
exports.index = (req, res) =>{
    // render html + data

    res.render('index.ejs', {
        apiData: data
    }),
    console.log('entered index');
   // console.log(data)
}

exports.battery = (req, res) =>{
    res.render('battery.ejs', {
        apiData: dataBattery
    }),
    console.log('entered battery')
}



exports.detail = (req, res) =>{
    // render html + data
    res.render('detail.ejs', {data: req.params.id})
    console.log('entered detail of ' + req.params.id)
}
//




// socket.io

